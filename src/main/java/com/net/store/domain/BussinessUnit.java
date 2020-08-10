package com.net.store.domain;


import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * A BussinessUnit.
 */
@Entity
@Table(name = "bussiness_unit")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "bussinessunit")
public class BussinessUnit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "nit")
    private String nit;

    @Column(name = "brand")
    private String brand;

    @Column(name = "active")
    private Boolean active;

    @OneToOne
    @JoinColumn(unique = true)
    private SubscriptionProgram bussiness;

    @OneToMany
    private Set<User> users;

    @OneToMany(mappedBy = "bussiness")
    private Set<Category> bussinessCategories = new HashSet<>();

    @OneToMany(mappedBy = "bussiness")
    private Set<PointOfSale> bussinessPOS = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here


    public Set<User> getUsers() {
        return users;
    }

    public void setUsers() {
        this.users = users;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public BussinessUnit name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNit() {
        return nit;
    }

    public BussinessUnit nit(String nit) {
        this.nit = nit;
        return this;
    }

    public void setNit(String nit) {
        this.nit = nit;
    }

    public String getBrand() {
        return brand;
    }

    public BussinessUnit brand(String brand) {
        this.brand = brand;
        return this;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public Boolean isActive() {
        return active;
    }

    public BussinessUnit active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public SubscriptionProgram getBussiness() {
        return bussiness;
    }

    public BussinessUnit bussiness(SubscriptionProgram subscriptionProgram) {
        this.bussiness = subscriptionProgram;
        return this;
    }

    public void setBussiness(SubscriptionProgram subscriptionProgram) {
        this.bussiness = subscriptionProgram;
    }

    public Set<Category> getBussinessCategories() {
        return bussinessCategories;
    }

    public BussinessUnit bussinessCategories(Set<Category> categories) {
        this.bussinessCategories = categories;
        return this;
    }

    public BussinessUnit addBussinessCategories(Category category) {
        this.bussinessCategories.add(category);
        category.setBussiness(this);
        return this;
    }

    public BussinessUnit removeBussinessCategories(Category category) {
        this.bussinessCategories.remove(category);
        category.setBussiness(null);
        return this;
    }

    public void setBussinessCategories(Set<Category> categories) {
        this.bussinessCategories = categories;
    }

    public Set<PointOfSale> getBussinessPOS() {
        return bussinessPOS;
    }

    public BussinessUnit bussinessPOS(Set<PointOfSale> pointOfSales) {
        this.bussinessPOS = pointOfSales;
        return this;
    }

    public BussinessUnit addBussinessPOS(PointOfSale pointOfSale) {
        this.bussinessPOS.add(pointOfSale);
        pointOfSale.setBussiness(this);
        return this;
    }

    public BussinessUnit removeBussinessPOS(PointOfSale pointOfSale) {
        this.bussinessPOS.remove(pointOfSale);
        pointOfSale.setBussiness(null);
        return this;
    }

    public void setBussinessPOS(Set<PointOfSale> pointOfSales) {
        this.bussinessPOS = pointOfSales;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BussinessUnit)) {
            return false;
        }
        return id != null && id.equals(((BussinessUnit) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BussinessUnit{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", nit='" + getNit() + "'" +
            ", brand='" + getBrand() + "'" +
            ", active='" + isActive() + "'" +
            "}";
    }
}
