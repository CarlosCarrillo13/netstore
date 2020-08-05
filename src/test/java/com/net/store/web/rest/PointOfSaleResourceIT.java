package com.net.store.web.rest;

import com.net.store.NetstoreApp;
import com.net.store.domain.PointOfSale;
import com.net.store.repository.PointOfSaleRepository;
import com.net.store.repository.search.PointOfSaleSearchRepository;

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

import com.net.store.domain.enumeration.Status;
/**
 * Integration tests for the {@link PointOfSaleResource} REST controller.
 */
@SpringBootTest(classes = NetstoreApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class PointOfSaleResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Boolean DEFAULT_SUBSCRIBED = false;
    private static final Boolean UPDATED_SUBSCRIBED = true;

    private static final Status DEFAULT_STATUS = Status.ACTIVE;
    private static final Status UPDATED_STATUS = Status.ON_HOLD;

    @Autowired
    private PointOfSaleRepository pointOfSaleRepository;

    /**
     * This repository is mocked in the com.net.store.repository.search test package.
     *
     * @see com.net.store.repository.search.PointOfSaleSearchRepositoryMockConfiguration
     */
    @Autowired
    private PointOfSaleSearchRepository mockPointOfSaleSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPointOfSaleMockMvc;

    private PointOfSale pointOfSale;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PointOfSale createEntity(EntityManager em) {
        PointOfSale pointOfSale = new PointOfSale()
            .name(DEFAULT_NAME)
            .subscribed(DEFAULT_SUBSCRIBED)
            .status(DEFAULT_STATUS);
        return pointOfSale;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PointOfSale createUpdatedEntity(EntityManager em) {
        PointOfSale pointOfSale = new PointOfSale()
            .name(UPDATED_NAME)
            .subscribed(UPDATED_SUBSCRIBED)
            .status(UPDATED_STATUS);
        return pointOfSale;
    }

    @BeforeEach
    public void initTest() {
        pointOfSale = createEntity(em);
    }

    @Test
    @Transactional
    public void createPointOfSale() throws Exception {
        int databaseSizeBeforeCreate = pointOfSaleRepository.findAll().size();
        // Create the PointOfSale
        restPointOfSaleMockMvc.perform(post("/api/point-of-sales")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pointOfSale)))
            .andExpect(status().isCreated());

        // Validate the PointOfSale in the database
        List<PointOfSale> pointOfSaleList = pointOfSaleRepository.findAll();
        assertThat(pointOfSaleList).hasSize(databaseSizeBeforeCreate + 1);
        PointOfSale testPointOfSale = pointOfSaleList.get(pointOfSaleList.size() - 1);
        assertThat(testPointOfSale.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testPointOfSale.isSubscribed()).isEqualTo(DEFAULT_SUBSCRIBED);
        assertThat(testPointOfSale.getStatus()).isEqualTo(DEFAULT_STATUS);

        // Validate the PointOfSale in Elasticsearch
        verify(mockPointOfSaleSearchRepository, times(1)).save(testPointOfSale);
    }

    @Test
    @Transactional
    public void createPointOfSaleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pointOfSaleRepository.findAll().size();

        // Create the PointOfSale with an existing ID
        pointOfSale.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPointOfSaleMockMvc.perform(post("/api/point-of-sales")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pointOfSale)))
            .andExpect(status().isBadRequest());

        // Validate the PointOfSale in the database
        List<PointOfSale> pointOfSaleList = pointOfSaleRepository.findAll();
        assertThat(pointOfSaleList).hasSize(databaseSizeBeforeCreate);

        // Validate the PointOfSale in Elasticsearch
        verify(mockPointOfSaleSearchRepository, times(0)).save(pointOfSale);
    }


    @Test
    @Transactional
    public void getAllPointOfSales() throws Exception {
        // Initialize the database
        pointOfSaleRepository.saveAndFlush(pointOfSale);

        // Get all the pointOfSaleList
        restPointOfSaleMockMvc.perform(get("/api/point-of-sales?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pointOfSale.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].subscribed").value(hasItem(DEFAULT_SUBSCRIBED.booleanValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
    
    @Test
    @Transactional
    public void getPointOfSale() throws Exception {
        // Initialize the database
        pointOfSaleRepository.saveAndFlush(pointOfSale);

        // Get the pointOfSale
        restPointOfSaleMockMvc.perform(get("/api/point-of-sales/{id}", pointOfSale.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(pointOfSale.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.subscribed").value(DEFAULT_SUBSCRIBED.booleanValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingPointOfSale() throws Exception {
        // Get the pointOfSale
        restPointOfSaleMockMvc.perform(get("/api/point-of-sales/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePointOfSale() throws Exception {
        // Initialize the database
        pointOfSaleRepository.saveAndFlush(pointOfSale);

        int databaseSizeBeforeUpdate = pointOfSaleRepository.findAll().size();

        // Update the pointOfSale
        PointOfSale updatedPointOfSale = pointOfSaleRepository.findById(pointOfSale.getId()).get();
        // Disconnect from session so that the updates on updatedPointOfSale are not directly saved in db
        em.detach(updatedPointOfSale);
        updatedPointOfSale
            .name(UPDATED_NAME)
            .subscribed(UPDATED_SUBSCRIBED)
            .status(UPDATED_STATUS);

        restPointOfSaleMockMvc.perform(put("/api/point-of-sales")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPointOfSale)))
            .andExpect(status().isOk());

        // Validate the PointOfSale in the database
        List<PointOfSale> pointOfSaleList = pointOfSaleRepository.findAll();
        assertThat(pointOfSaleList).hasSize(databaseSizeBeforeUpdate);
        PointOfSale testPointOfSale = pointOfSaleList.get(pointOfSaleList.size() - 1);
        assertThat(testPointOfSale.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testPointOfSale.isSubscribed()).isEqualTo(UPDATED_SUBSCRIBED);
        assertThat(testPointOfSale.getStatus()).isEqualTo(UPDATED_STATUS);

        // Validate the PointOfSale in Elasticsearch
        verify(mockPointOfSaleSearchRepository, times(1)).save(testPointOfSale);
    }

    @Test
    @Transactional
    public void updateNonExistingPointOfSale() throws Exception {
        int databaseSizeBeforeUpdate = pointOfSaleRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPointOfSaleMockMvc.perform(put("/api/point-of-sales")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pointOfSale)))
            .andExpect(status().isBadRequest());

        // Validate the PointOfSale in the database
        List<PointOfSale> pointOfSaleList = pointOfSaleRepository.findAll();
        assertThat(pointOfSaleList).hasSize(databaseSizeBeforeUpdate);

        // Validate the PointOfSale in Elasticsearch
        verify(mockPointOfSaleSearchRepository, times(0)).save(pointOfSale);
    }

    @Test
    @Transactional
    public void deletePointOfSale() throws Exception {
        // Initialize the database
        pointOfSaleRepository.saveAndFlush(pointOfSale);

        int databaseSizeBeforeDelete = pointOfSaleRepository.findAll().size();

        // Delete the pointOfSale
        restPointOfSaleMockMvc.perform(delete("/api/point-of-sales/{id}", pointOfSale.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PointOfSale> pointOfSaleList = pointOfSaleRepository.findAll();
        assertThat(pointOfSaleList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the PointOfSale in Elasticsearch
        verify(mockPointOfSaleSearchRepository, times(1)).deleteById(pointOfSale.getId());
    }

    @Test
    @Transactional
    public void searchPointOfSale() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        pointOfSaleRepository.saveAndFlush(pointOfSale);
        when(mockPointOfSaleSearchRepository.search(queryStringQuery("id:" + pointOfSale.getId())))
            .thenReturn(Collections.singletonList(pointOfSale));

        // Search the pointOfSale
        restPointOfSaleMockMvc.perform(get("/api/_search/point-of-sales?query=id:" + pointOfSale.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pointOfSale.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].subscribed").value(hasItem(DEFAULT_SUBSCRIBED.booleanValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
}
