package com.net.store.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Item.
 */
@Entity
@Table(name = "item")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "item")
public class Item implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "sku")
    private String sku;

    @Column(name = "end_date")
    private String endDate;

    @Column(name = "amount")
    private String amount;

    @OneToMany(mappedBy = "item")
    private Set<Prize> itemPrizes = new HashSet<>();

    @OneToMany(mappedBy = "item")
    private Set<Discount> itemDiscounts = new HashSet<>();

    @OneToMany(mappedBy = "item")
    private Set<Tax> itemTaxes = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "items", allowSetters = true)
    private Category itemCategory;

    @ManyToOne
    @JsonIgnoreProperties(value = "invoiceItems", allowSetters = true)
    private Invoice invoice;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Item name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSku() {
        return sku;
    }

    public Item sku(String sku) {
        this.sku = sku;
        return this;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getEndDate() {
        return endDate;
    }

    public Item endDate(String endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getAmount() {
        return amount;
    }

    public Item amount(String amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public Set<Prize> getItemPrizes() {
        return itemPrizes;
    }

    public Item itemPrizes(Set<Prize> prizes) {
        this.itemPrizes = prizes;
        return this;
    }

    public Item addItemPrize(Prize prize) {
        this.itemPrizes.add(prize);
        prize.setItem(this);
        return this;
    }

    public Item removeItemPrize(Prize prize) {
        this.itemPrizes.remove(prize);
        prize.setItem(null);
        return this;
    }

    public void setItemPrizes(Set<Prize> prizes) {
        this.itemPrizes = prizes;
    }

    public Set<Discount> getItemDiscounts() {
        return itemDiscounts;
    }

    public Item itemDiscounts(Set<Discount> discounts) {
        this.itemDiscounts = discounts;
        return this;
    }

    public Item addItemDiscount(Discount discount) {
        this.itemDiscounts.add(discount);
        discount.setItem(this);
        return this;
    }

    public Item removeItemDiscount(Discount discount) {
        this.itemDiscounts.remove(discount);
        discount.setItem(null);
        return this;
    }

    public void setItemDiscounts(Set<Discount> discounts) {
        this.itemDiscounts = discounts;
    }

    public Set<Tax> getItemTaxes() {
        return itemTaxes;
    }

    public Item itemTaxes(Set<Tax> taxes) {
        this.itemTaxes = taxes;
        return this;
    }

    public Item addItemTax(Tax tax) {
        this.itemTaxes.add(tax);
        tax.setItem(this);
        return this;
    }

    public Item removeItemTax(Tax tax) {
        this.itemTaxes.remove(tax);
        tax.setItem(null);
        return this;
    }

    public void setItemTaxes(Set<Tax> taxes) {
        this.itemTaxes = taxes;
    }

    public Category getItemCategory() {
        return itemCategory;
    }

    public Item itemCategory(Category category) {
        this.itemCategory = category;
        return this;
    }

    public void setItemCategory(Category category) {
        this.itemCategory = category;
    }

    public Invoice getInvoice() {
        return invoice;
    }

    public Item invoice(Invoice invoice) {
        this.invoice = invoice;
        return this;
    }

    public void setInvoice(Invoice invoice) {
        this.invoice = invoice;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Item)) {
            return false;
        }
        return id != null && id.equals(((Item) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Item{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", sku='" + getSku() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", amount='" + getAmount() + "'" +
            "}";
    }
}
