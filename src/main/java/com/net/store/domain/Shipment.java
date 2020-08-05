package com.net.store.domain;


import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

import com.net.store.domain.enumeration.DeliveryStatus;

/**
 * A Shipment.
 */
@Entity
@Table(name = "shipment")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "shipment")
public class Shipment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "ship_date")
    private String shipDate;

    @Column(name = "estimated_arrival_date")
    private String estimatedArrivalDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "delivery_status")
    private DeliveryStatus deliveryStatus;

    @Column(name = "tracking_number")
    private String trackingNumber;

    @Column(name = "shipping_company")
    private String shippingCompany;

    @OneToOne
    @JoinColumn(unique = true)
    private Location shipmentAddress;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getShipDate() {
        return shipDate;
    }

    public Shipment shipDate(String shipDate) {
        this.shipDate = shipDate;
        return this;
    }

    public void setShipDate(String shipDate) {
        this.shipDate = shipDate;
    }

    public String getEstimatedArrivalDate() {
        return estimatedArrivalDate;
    }

    public Shipment estimatedArrivalDate(String estimatedArrivalDate) {
        this.estimatedArrivalDate = estimatedArrivalDate;
        return this;
    }

    public void setEstimatedArrivalDate(String estimatedArrivalDate) {
        this.estimatedArrivalDate = estimatedArrivalDate;
    }

    public DeliveryStatus getDeliveryStatus() {
        return deliveryStatus;
    }

    public Shipment deliveryStatus(DeliveryStatus deliveryStatus) {
        this.deliveryStatus = deliveryStatus;
        return this;
    }

    public void setDeliveryStatus(DeliveryStatus deliveryStatus) {
        this.deliveryStatus = deliveryStatus;
    }

    public String getTrackingNumber() {
        return trackingNumber;
    }

    public Shipment trackingNumber(String trackingNumber) {
        this.trackingNumber = trackingNumber;
        return this;
    }

    public void setTrackingNumber(String trackingNumber) {
        this.trackingNumber = trackingNumber;
    }

    public String getShippingCompany() {
        return shippingCompany;
    }

    public Shipment shippingCompany(String shippingCompany) {
        this.shippingCompany = shippingCompany;
        return this;
    }

    public void setShippingCompany(String shippingCompany) {
        this.shippingCompany = shippingCompany;
    }

    public Location getShipmentAddress() {
        return shipmentAddress;
    }

    public Shipment shipmentAddress(Location location) {
        this.shipmentAddress = location;
        return this;
    }

    public void setShipmentAddress(Location location) {
        this.shipmentAddress = location;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Shipment)) {
            return false;
        }
        return id != null && id.equals(((Shipment) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Shipment{" +
            "id=" + getId() +
            ", shipDate='" + getShipDate() + "'" +
            ", estimatedArrivalDate='" + getEstimatedArrivalDate() + "'" +
            ", deliveryStatus='" + getDeliveryStatus() + "'" +
            ", trackingNumber='" + getTrackingNumber() + "'" +
            ", shippingCompany='" + getShippingCompany() + "'" +
            "}";
    }
}
