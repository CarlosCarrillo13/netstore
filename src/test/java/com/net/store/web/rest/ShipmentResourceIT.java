package com.net.store.web.rest;

import com.net.store.NetstoreApp;
import com.net.store.domain.Shipment;
import com.net.store.repository.ShipmentRepository;
import com.net.store.repository.search.ShipmentSearchRepository;

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

import com.net.store.domain.enumeration.DeliveryStatus;
/**
 * Integration tests for the {@link ShipmentResource} REST controller.
 */
@SpringBootTest(classes = NetstoreApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class ShipmentResourceIT {

    private static final String DEFAULT_SHIP_DATE = "AAAAAAAAAA";
    private static final String UPDATED_SHIP_DATE = "BBBBBBBBBB";

    private static final String DEFAULT_ESTIMATED_ARRIVAL_DATE = "AAAAAAAAAA";
    private static final String UPDATED_ESTIMATED_ARRIVAL_DATE = "BBBBBBBBBB";

    private static final DeliveryStatus DEFAULT_DELIVERY_STATUS = DeliveryStatus.ISSUED;
    private static final DeliveryStatus UPDATED_DELIVERY_STATUS = DeliveryStatus.DELIVERED;

    private static final String DEFAULT_TRACKING_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_TRACKING_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_SHIPPING_COMPANY = "AAAAAAAAAA";
    private static final String UPDATED_SHIPPING_COMPANY = "BBBBBBBBBB";

    @Autowired
    private ShipmentRepository shipmentRepository;

    /**
     * This repository is mocked in the com.net.store.repository.search test package.
     *
     * @see com.net.store.repository.search.ShipmentSearchRepositoryMockConfiguration
     */
    @Autowired
    private ShipmentSearchRepository mockShipmentSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restShipmentMockMvc;

    private Shipment shipment;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Shipment createEntity(EntityManager em) {
        Shipment shipment = new Shipment()
            .shipDate(DEFAULT_SHIP_DATE)
            .estimatedArrivalDate(DEFAULT_ESTIMATED_ARRIVAL_DATE)
            .deliveryStatus(DEFAULT_DELIVERY_STATUS)
            .trackingNumber(DEFAULT_TRACKING_NUMBER)
            .shippingCompany(DEFAULT_SHIPPING_COMPANY);
        return shipment;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Shipment createUpdatedEntity(EntityManager em) {
        Shipment shipment = new Shipment()
            .shipDate(UPDATED_SHIP_DATE)
            .estimatedArrivalDate(UPDATED_ESTIMATED_ARRIVAL_DATE)
            .deliveryStatus(UPDATED_DELIVERY_STATUS)
            .trackingNumber(UPDATED_TRACKING_NUMBER)
            .shippingCompany(UPDATED_SHIPPING_COMPANY);
        return shipment;
    }

    @BeforeEach
    public void initTest() {
        shipment = createEntity(em);
    }

    @Test
    @Transactional
    public void createShipment() throws Exception {
        int databaseSizeBeforeCreate = shipmentRepository.findAll().size();
        // Create the Shipment
        restShipmentMockMvc.perform(post("/api/shipments")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(shipment)))
            .andExpect(status().isCreated());

        // Validate the Shipment in the database
        List<Shipment> shipmentList = shipmentRepository.findAll();
        assertThat(shipmentList).hasSize(databaseSizeBeforeCreate + 1);
        Shipment testShipment = shipmentList.get(shipmentList.size() - 1);
        assertThat(testShipment.getShipDate()).isEqualTo(DEFAULT_SHIP_DATE);
        assertThat(testShipment.getEstimatedArrivalDate()).isEqualTo(DEFAULT_ESTIMATED_ARRIVAL_DATE);
        assertThat(testShipment.getDeliveryStatus()).isEqualTo(DEFAULT_DELIVERY_STATUS);
        assertThat(testShipment.getTrackingNumber()).isEqualTo(DEFAULT_TRACKING_NUMBER);
        assertThat(testShipment.getShippingCompany()).isEqualTo(DEFAULT_SHIPPING_COMPANY);

        // Validate the Shipment in Elasticsearch
        verify(mockShipmentSearchRepository, times(1)).save(testShipment);
    }

    @Test
    @Transactional
    public void createShipmentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = shipmentRepository.findAll().size();

        // Create the Shipment with an existing ID
        shipment.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restShipmentMockMvc.perform(post("/api/shipments")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(shipment)))
            .andExpect(status().isBadRequest());

        // Validate the Shipment in the database
        List<Shipment> shipmentList = shipmentRepository.findAll();
        assertThat(shipmentList).hasSize(databaseSizeBeforeCreate);

        // Validate the Shipment in Elasticsearch
        verify(mockShipmentSearchRepository, times(0)).save(shipment);
    }


    @Test
    @Transactional
    public void getAllShipments() throws Exception {
        // Initialize the database
        shipmentRepository.saveAndFlush(shipment);

        // Get all the shipmentList
        restShipmentMockMvc.perform(get("/api/shipments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(shipment.getId().intValue())))
            .andExpect(jsonPath("$.[*].shipDate").value(hasItem(DEFAULT_SHIP_DATE)))
            .andExpect(jsonPath("$.[*].estimatedArrivalDate").value(hasItem(DEFAULT_ESTIMATED_ARRIVAL_DATE)))
            .andExpect(jsonPath("$.[*].deliveryStatus").value(hasItem(DEFAULT_DELIVERY_STATUS.toString())))
            .andExpect(jsonPath("$.[*].trackingNumber").value(hasItem(DEFAULT_TRACKING_NUMBER)))
            .andExpect(jsonPath("$.[*].shippingCompany").value(hasItem(DEFAULT_SHIPPING_COMPANY)));
    }
    
    @Test
    @Transactional
    public void getShipment() throws Exception {
        // Initialize the database
        shipmentRepository.saveAndFlush(shipment);

        // Get the shipment
        restShipmentMockMvc.perform(get("/api/shipments/{id}", shipment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(shipment.getId().intValue()))
            .andExpect(jsonPath("$.shipDate").value(DEFAULT_SHIP_DATE))
            .andExpect(jsonPath("$.estimatedArrivalDate").value(DEFAULT_ESTIMATED_ARRIVAL_DATE))
            .andExpect(jsonPath("$.deliveryStatus").value(DEFAULT_DELIVERY_STATUS.toString()))
            .andExpect(jsonPath("$.trackingNumber").value(DEFAULT_TRACKING_NUMBER))
            .andExpect(jsonPath("$.shippingCompany").value(DEFAULT_SHIPPING_COMPANY));
    }
    @Test
    @Transactional
    public void getNonExistingShipment() throws Exception {
        // Get the shipment
        restShipmentMockMvc.perform(get("/api/shipments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateShipment() throws Exception {
        // Initialize the database
        shipmentRepository.saveAndFlush(shipment);

        int databaseSizeBeforeUpdate = shipmentRepository.findAll().size();

        // Update the shipment
        Shipment updatedShipment = shipmentRepository.findById(shipment.getId()).get();
        // Disconnect from session so that the updates on updatedShipment are not directly saved in db
        em.detach(updatedShipment);
        updatedShipment
            .shipDate(UPDATED_SHIP_DATE)
            .estimatedArrivalDate(UPDATED_ESTIMATED_ARRIVAL_DATE)
            .deliveryStatus(UPDATED_DELIVERY_STATUS)
            .trackingNumber(UPDATED_TRACKING_NUMBER)
            .shippingCompany(UPDATED_SHIPPING_COMPANY);

        restShipmentMockMvc.perform(put("/api/shipments")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedShipment)))
            .andExpect(status().isOk());

        // Validate the Shipment in the database
        List<Shipment> shipmentList = shipmentRepository.findAll();
        assertThat(shipmentList).hasSize(databaseSizeBeforeUpdate);
        Shipment testShipment = shipmentList.get(shipmentList.size() - 1);
        assertThat(testShipment.getShipDate()).isEqualTo(UPDATED_SHIP_DATE);
        assertThat(testShipment.getEstimatedArrivalDate()).isEqualTo(UPDATED_ESTIMATED_ARRIVAL_DATE);
        assertThat(testShipment.getDeliveryStatus()).isEqualTo(UPDATED_DELIVERY_STATUS);
        assertThat(testShipment.getTrackingNumber()).isEqualTo(UPDATED_TRACKING_NUMBER);
        assertThat(testShipment.getShippingCompany()).isEqualTo(UPDATED_SHIPPING_COMPANY);

        // Validate the Shipment in Elasticsearch
        verify(mockShipmentSearchRepository, times(1)).save(testShipment);
    }

    @Test
    @Transactional
    public void updateNonExistingShipment() throws Exception {
        int databaseSizeBeforeUpdate = shipmentRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restShipmentMockMvc.perform(put("/api/shipments")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(shipment)))
            .andExpect(status().isBadRequest());

        // Validate the Shipment in the database
        List<Shipment> shipmentList = shipmentRepository.findAll();
        assertThat(shipmentList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Shipment in Elasticsearch
        verify(mockShipmentSearchRepository, times(0)).save(shipment);
    }

    @Test
    @Transactional
    public void deleteShipment() throws Exception {
        // Initialize the database
        shipmentRepository.saveAndFlush(shipment);

        int databaseSizeBeforeDelete = shipmentRepository.findAll().size();

        // Delete the shipment
        restShipmentMockMvc.perform(delete("/api/shipments/{id}", shipment.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Shipment> shipmentList = shipmentRepository.findAll();
        assertThat(shipmentList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Shipment in Elasticsearch
        verify(mockShipmentSearchRepository, times(1)).deleteById(shipment.getId());
    }

    @Test
    @Transactional
    public void searchShipment() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        shipmentRepository.saveAndFlush(shipment);
        when(mockShipmentSearchRepository.search(queryStringQuery("id:" + shipment.getId())))
            .thenReturn(Collections.singletonList(shipment));

        // Search the shipment
        restShipmentMockMvc.perform(get("/api/_search/shipments?query=id:" + shipment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(shipment.getId().intValue())))
            .andExpect(jsonPath("$.[*].shipDate").value(hasItem(DEFAULT_SHIP_DATE)))
            .andExpect(jsonPath("$.[*].estimatedArrivalDate").value(hasItem(DEFAULT_ESTIMATED_ARRIVAL_DATE)))
            .andExpect(jsonPath("$.[*].deliveryStatus").value(hasItem(DEFAULT_DELIVERY_STATUS.toString())))
            .andExpect(jsonPath("$.[*].trackingNumber").value(hasItem(DEFAULT_TRACKING_NUMBER)))
            .andExpect(jsonPath("$.[*].shippingCompany").value(hasItem(DEFAULT_SHIPPING_COMPANY)));
    }
}
