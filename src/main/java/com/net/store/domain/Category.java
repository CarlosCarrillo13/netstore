package com.net.store.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Category.
 */
@Entity
@Table(name = "category")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "category")
public class Category implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "uuid")
    private String uuid;

    @OneToMany(mappedBy = "itemCategory")
    private Set<Item> items = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "bussinessCategories", allowSetters = true)
    private BussinessUnit bussiness;

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

    public Category name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUuid() {
        return uuid;
    }

    public Category uuid(String uuid) {
        this.uuid = uuid;
        return this;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public Set<Item> getItems() {
        return items;
    }

    public Category items(Set<Item> items) {
        this.items = items;
        return this;
    }

    public Category addItem(Item item) {
        this.items.add(item);
        item.setItemCategory(this);
        return this;
    }

    public Category removeItem(Item item) {
        this.items.remove(item);
        item.setItemCategory(null);
        return this;
    }

    public void setItems(Set<Item> items) {
        this.items = items;
    }

    public BussinessUnit getBussiness() {
        return bussiness;
    }

    public Category bussiness(BussinessUnit bussinessUnit) {
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
        if (!(o instanceof Category)) {
            return false;
        }
        return id != null && id.equals(((Category) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Category{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", uuid='" + getUuid() + "'" +
            "}";
    }
}
