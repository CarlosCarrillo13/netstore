package com.net.store.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

import com.net.store.domain.enumeration.SubType;

/**
 * A SubscriptionProgram.
 */
@Entity
@Table(name = "subscription_program")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "subscriptionprogram")
public class SubscriptionProgram implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "subscription_type")
    private SubType subscriptionType;

    @Column(name = "start_date")
    private String startDate;

    @Column(name = "end_date")
    private String endDate;

    @Column(name = "amount")
    private String amount;

    @Column(name = "number_of_pos")
    private Integer numberOfPos;

    @OneToOne(mappedBy = "bussiness")
    @JsonIgnore
    private BussinessUnit subscriptionProgram;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SubType getSubscriptionType() {
        return subscriptionType;
    }

    public SubscriptionProgram subscriptionType(SubType subscriptionType) {
        this.subscriptionType = subscriptionType;
        return this;
    }

    public void setSubscriptionType(SubType subscriptionType) {
        this.subscriptionType = subscriptionType;
    }

    public String getStartDate() {
        return startDate;
    }

    public SubscriptionProgram startDate(String startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public SubscriptionProgram endDate(String endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getAmount() {
        return amount;
    }

    public SubscriptionProgram amount(String amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public Integer getNumberOfPos() {
        return numberOfPos;
    }

    public SubscriptionProgram numberOfPos(Integer numberOfPos) {
        this.numberOfPos = numberOfPos;
        return this;
    }

    public void setNumberOfPos(Integer numberOfPos) {
        this.numberOfPos = numberOfPos;
    }

    public BussinessUnit getSubscriptionProgram() {
        return subscriptionProgram;
    }

    public SubscriptionProgram subscriptionProgram(BussinessUnit bussinessUnit) {
        this.subscriptionProgram = bussinessUnit;
        return this;
    }

    public void setSubscriptionProgram(BussinessUnit bussinessUnit) {
        this.subscriptionProgram = bussinessUnit;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SubscriptionProgram)) {
            return false;
        }
        return id != null && id.equals(((SubscriptionProgram) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SubscriptionProgram{" +
            "id=" + getId() +
            ", subscriptionType='" + getSubscriptionType() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", amount='" + getAmount() + "'" +
            ", numberOfPos=" + getNumberOfPos() +
            "}";
    }
}
