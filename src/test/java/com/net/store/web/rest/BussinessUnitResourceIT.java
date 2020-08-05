package com.net.store.web.rest;

import com.net.store.NetstoreApp;
import com.net.store.domain.BussinessUnit;
import com.net.store.repository.BussinessUnitRepository;
import com.net.store.repository.search.BussinessUnitSearchRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link BussinessUnitResource} REST controller.
 */
@SpringBootTest(classes = NetstoreApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class BussinessUnitResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_NIT = "AAAAAAAAAA";
    private static final String UPDATED_NIT = "BBBBBBBBBB";

    private static final String DEFAULT_BRAND = "AAAAAAAAAA";
    private static final String UPDATED_BRAND = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    @Autowired
    private BussinessUnitRepository bussinessUnitRepository;

    /**
     * This repository is mocked in the com.net.store.repository.search test package.
     *
     * @see com.net.store.repository.search.BussinessUnitSearchRepositoryMockConfiguration
     */
    @Autowired
    private BussinessUnitSearchRepository mockBussinessUnitSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBussinessUnitMockMvc;

    private BussinessUnit bussinessUnit;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BussinessUnit createEntity(EntityManager em) {
        BussinessUnit bussinessUnit = new BussinessUnit()
            .name(DEFAULT_NAME)
            .nit(DEFAULT_NIT)
            .brand(DEFAULT_BRAND)
            .active(DEFAULT_ACTIVE);
        return bussinessUnit;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BussinessUnit createUpdatedEntity(EntityManager em) {
        BussinessUnit bussinessUnit = new BussinessUnit()
            .name(UPDATED_NAME)
            .nit(UPDATED_NIT)
            .brand(UPDATED_BRAND)
            .active(UPDATED_ACTIVE);
        return bussinessUnit;
    }

    @BeforeEach
    public void initTest() {
        bussinessUnit = createEntity(em);
    }

    @Test
    @Transactional
    public void createBussinessUnit() throws Exception {
        int databaseSizeBeforeCreate = bussinessUnitRepository.findAll().size();
        // Create the BussinessUnit
        restBussinessUnitMockMvc.perform(post("/api/bussiness-units")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bussinessUnit)))
            .andExpect(status().isCreated());

        // Validate the BussinessUnit in the database
        List<BussinessUnit> bussinessUnitList = bussinessUnitRepository.findAll();
        assertThat(bussinessUnitList).hasSize(databaseSizeBeforeCreate + 1);
        BussinessUnit testBussinessUnit = bussinessUnitList.get(bussinessUnitList.size() - 1);
        assertThat(testBussinessUnit.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testBussinessUnit.getNit()).isEqualTo(DEFAULT_NIT);
        assertThat(testBussinessUnit.getBrand()).isEqualTo(DEFAULT_BRAND);
        assertThat(testBussinessUnit.isActive()).isEqualTo(DEFAULT_ACTIVE);

        // Validate the BussinessUnit in Elasticsearch
        verify(mockBussinessUnitSearchRepository, times(1)).save(testBussinessUnit);
    }

    @Test
    @Transactional
    public void createBussinessUnitWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bussinessUnitRepository.findAll().size();

        // Create the BussinessUnit with an existing ID
        bussinessUnit.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBussinessUnitMockMvc.perform(post("/api/bussiness-units")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bussinessUnit)))
            .andExpect(status().isBadRequest());

        // Validate the BussinessUnit in the database
        List<BussinessUnit> bussinessUnitList = bussinessUnitRepository.findAll();
        assertThat(bussinessUnitList).hasSize(databaseSizeBeforeCreate);

        // Validate the BussinessUnit in Elasticsearch
        verify(mockBussinessUnitSearchRepository, times(0)).save(bussinessUnit);
    }


    @Test
    @Transactional
    public void getAllBussinessUnits() throws Exception {
        // Initialize the database
        bussinessUnitRepository.saveAndFlush(bussinessUnit);

        // Get all the bussinessUnitList
        restBussinessUnitMockMvc.perform(get("/api/bussiness-units?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bussinessUnit.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].nit").value(hasItem(DEFAULT_NIT)))
            .andExpect(jsonPath("$.[*].brand").value(hasItem(DEFAULT_BRAND)))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getBussinessUnit() throws Exception {
        // Initialize the database
        bussinessUnitRepository.saveAndFlush(bussinessUnit);

        // Get the bussinessUnit
        restBussinessUnitMockMvc.perform(get("/api/bussiness-units/{id}", bussinessUnit.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(bussinessUnit.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.nit").value(DEFAULT_NIT))
            .andExpect(jsonPath("$.brand").value(DEFAULT_BRAND))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingBussinessUnit() throws Exception {
        // Get the bussinessUnit
        restBussinessUnitMockMvc.perform(get("/api/bussiness-units/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBussinessUnit() throws Exception {
        // Initialize the database
        bussinessUnitRepository.saveAndFlush(bussinessUnit);

        int databaseSizeBeforeUpdate = bussinessUnitRepository.findAll().size();

        // Update the bussinessUnit
        BussinessUnit updatedBussinessUnit = bussinessUnitRepository.findById(bussinessUnit.getId()).get();
        // Disconnect from session so that the updates on updatedBussinessUnit are not directly saved in db
        em.detach(updatedBussinessUnit);
        updatedBussinessUnit
            .name(UPDATED_NAME)
            .nit(UPDATED_NIT)
            .brand(UPDATED_BRAND)
            .active(UPDATED_ACTIVE);

        restBussinessUnitMockMvc.perform(put("/api/bussiness-units")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedBussinessUnit)))
            .andExpect(status().isOk());

        // Validate the BussinessUnit in the database
        List<BussinessUnit> bussinessUnitList = bussinessUnitRepository.findAll();
        assertThat(bussinessUnitList).hasSize(databaseSizeBeforeUpdate);
        BussinessUnit testBussinessUnit = bussinessUnitList.get(bussinessUnitList.size() - 1);
        assertThat(testBussinessUnit.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testBussinessUnit.getNit()).isEqualTo(UPDATED_NIT);
        assertThat(testBussinessUnit.getBrand()).isEqualTo(UPDATED_BRAND);
        assertThat(testBussinessUnit.isActive()).isEqualTo(UPDATED_ACTIVE);

        // Validate the BussinessUnit in Elasticsearch
        verify(mockBussinessUnitSearchRepository, times(1)).save(testBussinessUnit);
    }

    @Test
    @Transactional
    public void updateNonExistingBussinessUnit() throws Exception {
        int databaseSizeBeforeUpdate = bussinessUnitRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBussinessUnitMockMvc.perform(put("/api/bussiness-units")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bussinessUnit)))
            .andExpect(status().isBadRequest());

        // Validate the BussinessUnit in the database
        List<BussinessUnit> bussinessUnitList = bussinessUnitRepository.findAll();
        assertThat(bussinessUnitList).hasSize(databaseSizeBeforeUpdate);

        // Validate the BussinessUnit in Elasticsearch
        verify(mockBussinessUnitSearchRepository, times(0)).save(bussinessUnit);
    }

    @Test
    @Transactional
    public void deleteBussinessUnit() throws Exception {
        // Initialize the database
        bussinessUnitRepository.saveAndFlush(bussinessUnit);

        int databaseSizeBeforeDelete = bussinessUnitRepository.findAll().size();

        // Delete the bussinessUnit
        restBussinessUnitMockMvc.perform(delete("/api/bussiness-units/{id}", bussinessUnit.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<BussinessUnit> bussinessUnitList = bussinessUnitRepository.findAll();
        assertThat(bussinessUnitList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the BussinessUnit in Elasticsearch
        verify(mockBussinessUnitSearchRepository, times(1)).deleteById(bussinessUnit.getId());
    }

    @Test
    @Transactional
    public void searchBussinessUnit() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        bussinessUnitRepository.saveAndFlush(bussinessUnit);
        when(mockBussinessUnitSearchRepository.search(queryStringQuery("id:" + bussinessUnit.getId())))
            .thenReturn(Collections.singletonList(bussinessUnit));

        // Search the bussinessUnit
        restBussinessUnitMockMvc.perform(get("/api/_search/bussiness-units?query=id:" + bussinessUnit.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bussinessUnit.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].nit").value(hasItem(DEFAULT_NIT)))
            .andExpect(jsonPath("$.[*].brand").value(hasItem(DEFAULT_BRAND)))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())));
    }
}
