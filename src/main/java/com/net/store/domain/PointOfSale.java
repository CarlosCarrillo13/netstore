package com.net.store.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.net.store.domain.enumeration.Status;

/**
 * A PointOfSale.
 */
@Entity
@Table(name = "point_of_sale")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "pointofsale")
public class PointOfSale implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "subscribed")
    private Boolean subscribed;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @OneToOne
    @JoinColumn(unique = true)
    private Location address;

    @OneToMany(mappedBy = "pointOfSale")
    private Set<Prize> pointOfSalePrizes = new HashSet<>();

    @OneToMany(mappedBy = "pointOfSale")
    private Set<Employee> pointOfSaleEmployees = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "bussinessPOS", allowSetters = true)
    private BussinessUnit bussiness;

    @OneToMany
    @Column(name = "user")
    private Set<User> users = new HashSet<>();

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

    public PointOfSale name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean isSubscribed() {
        return subscribed;
    }

    public PointOfSale subscribed(Boolean subscribed) {
        this.subscribed = subscribed;
        return this;
    }

    public void setSubscribed(Boolean subscribed) {
        this.subscribed = subscribed;
    }

    public Status getStatus() {
        return status;
    }

    public PointOfSale status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Location getAddress() {
        return address;
    }

    public PointOfSale address(Location location) {
        this.address = location;
        return this;
    }

    public void setAddress(Location location) {
        this.address = location;
    }

    public Set<Prize> getPointOfSalePrizes() {
        return pointOfSalePrizes;
    }

    public PointOfSale pointOfSalePrizes(Set<Prize> prizes) {
        this.pointOfSalePrizes = prizes;
        return this;
    }

    public PointOfSale addPointOfSalePrize(Prize prize) {
        this.pointOfSalePrizes.add(prize);
        prize.setPointOfSale(this);
        return this;
    }

    public PointOfSale removePointOfSalePrize(Prize prize) {
        this.pointOfSalePrizes.remove(prize);
        prize.setPointOfSale(null);
        return this;
    }

    public void setPointOfSalePrizes(Set<Prize> prizes) {
        this.pointOfSalePrizes = prizes;
    }

    public Set<Employee> getPointOfSaleEmployees() {
        return pointOfSaleEmployees;
    }

    public PointOfSale pointOfSaleEmployees(Set<Employee> employees) {
        this.pointOfSaleEmployees = employees;
        return this;
    }

    public PointOfSale addPointOfSaleEmployee(Employee employee) {
        this.pointOfSaleEmployees.add(employee);
        employee.setPointOfSale(this);
        return this;
    }

    public PointOfSale removePointOfSaleEmployee(Employee employee) {
        this.pointOfSaleEmployees.remove(employee);
        employee.setPointOfSale(null);
        return this;
    }

    public void setPointOfSaleEmployees(Set<Employee> employees) {
        this.pointOfSaleEmployees = employees;
    }

    public BussinessUnit getBussiness() {
        return bussiness;
    }

    public PointOfSale bussiness(BussinessUnit bussinessUnit) {
        this.bussiness = bussinessUnit;
        return this;
    }

    public void setBussiness(BussinessUnit bussinessUnit) {
        this.bussiness = bussinessUnit;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PointOfSale)) {
            return false;
        }
        return id != null && id.equals(((PointOfSale) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PointOfSale{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", subscribed='" + isSubscribed() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
