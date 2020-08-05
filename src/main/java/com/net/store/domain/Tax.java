package com.net.store.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A Tax.
 */
@Entity
@Table(name = "tax")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "tax")
public class Tax implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "percentage")
    private Integer percentage;

    @Column(name = "concept")
    private String concept;

    @ManyToOne
    @JsonIgnoreProperties(value = "itemTaxes", allowSetters = true)
    private Item item;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPercentage() {
        return percentage;
    }

    public Tax percentage(Integer percentage) {
        this.percentage = percentage;
        return this;
    }

    public void setPercentage(Integer percentage) {
        this.percentage = percentage;
    }

    public String getConcept() {
        return concept;
    }

    public Tax concept(String concept) {
        this.concept = concept;
        return this;
    }

    public void setConcept(String concept) {
        this.concept = concept;
    }

    public Item getItem() {
        return item;
    }

    public Tax item(Item item) {
        this.item = item;
        return this;
    }

    public void setItem(Item item) {
        this.item = item;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Tax)) {
            return false;
        }
        return id != null && id.equals(((Tax) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Tax{" +
            "id=" + getId() +
            ", percentage=" + getPercentage() +
            ", concept='" + getConcept() + "'" +
            "}";
    }
}
