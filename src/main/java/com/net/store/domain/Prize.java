package com.net.store.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A Prize.
 */
@Entity
@Table(name = "prize")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "prize")
public class Prize implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "symbol")
    private String symbol;

    @Column(name = "country")
    private String country;

    @Column(name = "amount")
    private String amount;

    @ManyToOne
    @JsonIgnoreProperties(value = "itemPrizes", allowSetters = true)
    private Item item;

    @ManyToOne
    @JsonIgnoreProperties(value = "pointOfSalePrizes", allowSetters = true)
    private PointOfSale pointOfSale;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSymbol() {
        return symbol;
    }

    public Prize symbol(String symbol) {
        this.symbol = symbol;
        return this;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public String getCountry() {
        return country;
    }

    public Prize country(String country) {
        this.country = country;
        return this;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getAmount() {
        return amount;
    }

    public Prize amount(String amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public Item getItem() {
        return item;
    }

    public Prize item(Item item) {
        this.item = item;
        return this;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public PointOfSale getPointOfSale() {
        return pointOfSale;
    }

    public Prize pointOfSale(PointOfSale pointOfSale) {
        this.pointOfSale = pointOfSale;
        return this;
    }

    public void setPointOfSale(PointOfSale pointOfSale) {
        this.pointOfSale = pointOfSale;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Prize)) {
            return false;
        }
        return id != null && id.equals(((Prize) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Prize{" +
            "id=" + getId() +
            ", symbol='" + getSymbol() + "'" +
            ", country='" + getCountry() + "'" +
            ", amount='" + getAmount() + "'" +
            "}";
    }
}
