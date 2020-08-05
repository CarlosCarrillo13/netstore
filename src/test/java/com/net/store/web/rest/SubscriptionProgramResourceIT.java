package com.net.store.web.rest;

import com.net.store.NetstoreApp;
import com.net.store.domain.SubscriptionProgram;
import com.net.store.repository.SubscriptionProgramRepository;
import com.net.store.repository.search.SubscriptionProgramSearchRepository;

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

import com.net.store.domain.enumeration.SubType;
/**
 * Integration tests for the {@link SubscriptionProgramResource} REST controller.
 */
@SpringBootTest(classes = NetstoreApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class SubscriptionProgramResourceIT {

    private static final SubType DEFAULT_SUBSCRIPTION_TYPE = SubType.MONTHLY;
    private static final SubType UPDATED_SUBSCRIPTION_TYPE = SubType.YEARLY;

    private static final String DEFAULT_START_DATE = "AAAAAAAAAA";
    private static final String UPDATED_START_DATE = "BBBBBBBBBB";

    private static final String DEFAULT_END_DATE = "AAAAAAAAAA";
    private static final String UPDATED_END_DATE = "BBBBBBBBBB";

    private static final String DEFAULT_AMOUNT = "AAAAAAAAAA";
    private static final String UPDATED_AMOUNT = "BBBBBBBBBB";

    private static final Integer DEFAULT_NUMBER_OF_POS = 1;
    private static final Integer UPDATED_NUMBER_OF_POS = 2;

    @Autowired
    private SubscriptionProgramRepository subscriptionProgramRepository;

    /**
     * This repository is mocked in the com.net.store.repository.search test package.
     *
     * @see com.net.store.repository.search.SubscriptionProgramSearchRepositoryMockConfiguration
     */
    @Autowired
    private SubscriptionProgramSearchRepository mockSubscriptionProgramSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSubscriptionProgramMockMvc;

    private SubscriptionProgram subscriptionProgram;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SubscriptionProgram createEntity(EntityManager em) {
        SubscriptionProgram subscriptionProgram = new SubscriptionProgram()
            .subscriptionType(DEFAULT_SUBSCRIPTION_TYPE)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE)
            .amount(DEFAULT_AMOUNT)
            .numberOfPos(DEFAULT_NUMBER_OF_POS);
        return subscriptionProgram;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SubscriptionProgram createUpdatedEntity(EntityManager em) {
        SubscriptionProgram subscriptionProgram = new SubscriptionProgram()
            .subscriptionType(UPDATED_SUBSCRIPTION_TYPE)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .amount(UPDATED_AMOUNT)
            .numberOfPos(UPDATED_NUMBER_OF_POS);
        return subscriptionProgram;
    }

    @BeforeEach
    public void initTest() {
        subscriptionProgram = createEntity(em);
    }

    @Test
    @Transactional
    public void createSubscriptionProgram() throws Exception {
        int databaseSizeBeforeCreate = subscriptionProgramRepository.findAll().size();
        // Create the SubscriptionProgram
        restSubscriptionProgramMockMvc.perform(post("/api/subscription-programs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subscriptionProgram)))
            .andExpect(status().isCreated());

        // Validate the SubscriptionProgram in the database
        List<SubscriptionProgram> subscriptionProgramList = subscriptionProgramRepository.findAll();
        assertThat(subscriptionProgramList).hasSize(databaseSizeBeforeCreate + 1);
        SubscriptionProgram testSubscriptionProgram = subscriptionProgramList.get(subscriptionProgramList.size() - 1);
        assertThat(testSubscriptionProgram.getSubscriptionType()).isEqualTo(DEFAULT_SUBSCRIPTION_TYPE);
        assertThat(testSubscriptionProgram.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testSubscriptionProgram.getEndDate()).isEqualTo(DEFAULT_END_DATE);
        assertThat(testSubscriptionProgram.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testSubscriptionProgram.getNumberOfPos()).isEqualTo(DEFAULT_NUMBER_OF_POS);

        // Validate the SubscriptionProgram in Elasticsearch
        verify(mockSubscriptionProgramSearchRepository, times(1)).save(testSubscriptionProgram);
    }

    @Test
    @Transactional
    public void createSubscriptionProgramWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = subscriptionProgramRepository.findAll().size();

        // Create the SubscriptionProgram with an existing ID
        subscriptionProgram.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSubscriptionProgramMockMvc.perform(post("/api/subscription-programs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subscriptionProgram)))
            .andExpect(status().isBadRequest());

        // Validate the SubscriptionProgram in the database
        List<SubscriptionProgram> subscriptionProgramList = subscriptionProgramRepository.findAll();
        assertThat(subscriptionProgramList).hasSize(databaseSizeBeforeCreate);

        // Validate the SubscriptionProgram in Elasticsearch
        verify(mockSubscriptionProgramSearchRepository, times(0)).save(subscriptionProgram);
    }


    @Test
    @Transactional
    public void getAllSubscriptionPrograms() throws Exception {
        // Initialize the database
        subscriptionProgramRepository.saveAndFlush(subscriptionProgram);

        // Get all the subscriptionProgramList
        restSubscriptionProgramMockMvc.perform(get("/api/subscription-programs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subscriptionProgram.getId().intValue())))
            .andExpect(jsonPath("$.[*].subscriptionType").value(hasItem(DEFAULT_SUBSCRIPTION_TYPE.toString())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE)))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE)))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT)))
            .andExpect(jsonPath("$.[*].numberOfPos").value(hasItem(DEFAULT_NUMBER_OF_POS)));
    }
    
    @Test
    @Transactional
    public void getSubscriptionProgram() throws Exception {
        // Initialize the database
        subscriptionProgramRepository.saveAndFlush(subscriptionProgram);

        // Get the subscriptionProgram
        restSubscriptionProgramMockMvc.perform(get("/api/subscription-programs/{id}", subscriptionProgram.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(subscriptionProgram.getId().intValue()))
            .andExpect(jsonPath("$.subscriptionType").value(DEFAULT_SUBSCRIPTION_TYPE.toString()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT))
            .andExpect(jsonPath("$.numberOfPos").value(DEFAULT_NUMBER_OF_POS));
    }
    @Test
    @Transactional
    public void getNonExistingSubscriptionProgram() throws Exception {
        // Get the subscriptionProgram
        restSubscriptionProgramMockMvc.perform(get("/api/subscription-programs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSubscriptionProgram() throws Exception {
        // Initialize the database
        subscriptionProgramRepository.saveAndFlush(subscriptionProgram);

        int databaseSizeBeforeUpdate = subscriptionProgramRepository.findAll().size();

        // Update the subscriptionProgram
        SubscriptionProgram updatedSubscriptionProgram = subscriptionProgramRepository.findById(subscriptionProgram.getId()).get();
        // Disconnect from session so that the updates on updatedSubscriptionProgram are not directly saved in db
        em.detach(updatedSubscriptionProgram);
        updatedSubscriptionProgram
            .subscriptionType(UPDATED_SUBSCRIPTION_TYPE)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .amount(UPDATED_AMOUNT)
            .numberOfPos(UPDATED_NUMBER_OF_POS);

        restSubscriptionProgramMockMvc.perform(put("/api/subscription-programs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSubscriptionProgram)))
            .andExpect(status().isOk());

        // Validate the SubscriptionProgram in the database
        List<SubscriptionProgram> subscriptionProgramList = subscriptionProgramRepository.findAll();
        assertThat(subscriptionProgramList).hasSize(databaseSizeBeforeUpdate);
        SubscriptionProgram testSubscriptionProgram = subscriptionProgramList.get(subscriptionProgramList.size() - 1);
        assertThat(testSubscriptionProgram.getSubscriptionType()).isEqualTo(UPDATED_SUBSCRIPTION_TYPE);
        assertThat(testSubscriptionProgram.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testSubscriptionProgram.getEndDate()).isEqualTo(UPDATED_END_DATE);
        assertThat(testSubscriptionProgram.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testSubscriptionProgram.getNumberOfPos()).isEqualTo(UPDATED_NUMBER_OF_POS);

        // Validate the SubscriptionProgram in Elasticsearch
        verify(mockSubscriptionProgramSearchRepository, times(1)).save(testSubscriptionProgram);
    }

    @Test
    @Transactional
    public void updateNonExistingSubscriptionProgram() throws Exception {
        int databaseSizeBeforeUpdate = subscriptionProgramRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSubscriptionProgramMockMvc.perform(put("/api/subscription-programs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subscriptionProgram)))
            .andExpect(status().isBadRequest());

        // Validate the SubscriptionProgram in the database
        List<SubscriptionProgram> subscriptionProgramList = subscriptionProgramRepository.findAll();
        assertThat(subscriptionProgramList).hasSize(databaseSizeBeforeUpdate);

        // Validate the SubscriptionProgram in Elasticsearch
        verify(mockSubscriptionProgramSearchRepository, times(0)).save(subscriptionProgram);
    }

    @Test
    @Transactional
    public void deleteSubscriptionProgram() throws Exception {
        // Initialize the database
        subscriptionProgramRepository.saveAndFlush(subscriptionProgram);

        int databaseSizeBeforeDelete = subscriptionProgramRepository.findAll().size();

        // Delete the subscriptionProgram
        restSubscriptionProgramMockMvc.perform(delete("/api/subscription-programs/{id}", subscriptionProgram.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SubscriptionProgram> subscriptionProgramList = subscriptionProgramRepository.findAll();
        assertThat(subscriptionProgramList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the SubscriptionProgram in Elasticsearch
        verify(mockSubscriptionProgramSearchRepository, times(1)).deleteById(subscriptionProgram.getId());
    }

    @Test
    @Transactional
    public void searchSubscriptionProgram() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        subscriptionProgramRepository.saveAndFlush(subscriptionProgram);
        when(mockSubscriptionProgramSearchRepository.search(queryStringQuery("id:" + subscriptionProgram.getId())))
            .thenReturn(Collections.singletonList(subscriptionProgram));

        // Search the subscriptionProgram
        restSubscriptionProgramMockMvc.perform(get("/api/_search/subscription-programs?query=id:" + subscriptionProgram.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subscriptionProgram.getId().intValue())))
            .andExpect(jsonPath("$.[*].subscriptionType").value(hasItem(DEFAULT_SUBSCRIPTION_TYPE.toString())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE)))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE)))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT)))
            .andExpect(jsonPath("$.[*].numberOfPos").value(hasItem(DEFAULT_NUMBER_OF_POS)));
    }
}
