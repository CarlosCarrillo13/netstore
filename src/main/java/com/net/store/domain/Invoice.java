package com.net.store.domain;


import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Invoice.
 */
@Entity
@Table(name = "invoice")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "invoice")
public class Invoice implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "total_prize")
    private String totalPrize;

    @Column(name = "total_tax")
    private String totalTax;

    @Column(name = "total_discount")
    private String totalDiscount;

    @Column(name = "date")
    private String date;

    @Column(name = "recall")
    private Boolean recall;

    @OneToOne
    @JoinColumn(unique = true)
    private Employee invoiceVendor;

    @OneToOne
    @JoinColumn(unique = true)
    private Shipment invoiceShipment;

    @OneToMany(mappedBy = "invoice")
    private Set<Item> invoiceItems = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTotalPrize() {
        return totalPrize;
    }

    public Invoice totalPrize(String totalPrize) {
        this.totalPrize = totalPrize;
        return this;
    }

    public void setTotalPrize(String totalPrize) {
        this.totalPrize = totalPrize;
    }

    public String getTotalTax() {
        return totalTax;
    }

    public Invoice totalTax(String totalTax) {
        this.totalTax = totalTax;
        return this;
    }

    public void setTotalTax(String totalTax) {
        this.totalTax = totalTax;
    }

    public String getTotalDiscount() {
        return totalDiscount;
    }

    public Invoice totalDiscount(String totalDiscount) {
        this.totalDiscount = totalDiscount;
        return this;
    }

    public void setTotalDiscount(String totalDiscount) {
        this.totalDiscount = totalDiscount;
    }

    public String getDate() {
        return date;
    }

    public Invoice date(String date) {
        this.date = date;
        return this;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Boolean isRecall() {
        return recall;
    }

    public Invoice recall(Boolean recall) {
        this.recall = recall;
        return this;
    }

    public void setRecall(Boolean recall) {
        this.recall = recall;
    }

    public Employee getInvoiceVendor() {
        return invoiceVendor;
    }

    public Invoice invoiceVendor(Employee employee) {
        this.invoiceVendor = employee;
        return this;
    }

    public void setInvoiceVendor(Employee employee) {
        this.invoiceVendor = employee;
    }

    public Shipment getInvoiceShipment() {
        return invoiceShipment;
    }

    public Invoice invoiceShipment(Shipment shipment) {
        this.invoiceShipment = shipment;
        return this;
    }

    public void setInvoiceShipment(Shipment shipment) {
        this.invoiceShipment = shipment;
    }

    public Set<Item> getInvoiceItems() {
        return invoiceItems;
    }

    public Invoice invoiceItems(Set<Item> items) {
        this.invoiceItems = items;
        return this;
    }

    public Invoice addInvoiceItems(Item item) {
        this.invoiceItems.add(item);
        item.setInvoice(this);
        return this;
    }

    public Invoice removeInvoiceItems(Item item) {
        this.invoiceItems.remove(item);
        item.setInvoice(null);
        return this;
    }

    public void setInvoiceItems(Set<Item> items) {
        this.invoiceItems = items;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Invoice)) {
            return false;
        }
        return id != null && id.equals(((Invoice) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Invoice{" +
            "id=" + getId() +
            ", totalPrize='" + getTotalPrize() + "'" +
            ", totalTax='" + getTotalTax() + "'" +
            ", totalDiscount='" + getTotalDiscount() + "'" +
            ", date='" + getDate() + "'" +
            ", recall='" + isRecall() + "'" +
            "}";
    }
}
