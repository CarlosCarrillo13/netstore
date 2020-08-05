package com.net.store.web.rest;

import com.net.store.domain.Discount;
import com.net.store.repository.DiscountRepository;
import com.net.store.repository.search.DiscountSearchRepository;
import com.net.store.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.net.store.domain.Discount}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DiscountResource {

    private final Logger log = LoggerFactory.getLogger(DiscountResource.class);

    private static final String ENTITY_NAME = "discount";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DiscountRepository discountRepository;

    private final DiscountSearchRepository discountSearchRepository;

    public DiscountResource(DiscountRepository discountRepository, DiscountSearchRepository discountSearchRepository) {
        this.discountRepository = discountRepository;
        this.discountSearchRepository = discountSearchRepository;
    }

    /**
     * {@code POST  /discounts} : Create a new discount.
     *
     * @param discount the discount to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new discount, or with status {@code 400 (Bad Request)} if the discount has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/discounts")
    public ResponseEntity<Discount> createDiscount(@RequestBody Discount discount) throws URISyntaxException {
        log.debug("REST request to save Discount : {}", discount);
        if (discount.getId() != null) {
            throw new BadRequestAlertException("A new discount cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Discount result = discountRepository.save(discount);
        discountSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/discounts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /discounts} : Updates an existing discount.
     *
     * @param discount the discount to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated discount,
     * or with status {@code 400 (Bad Request)} if the discount is not valid,
     * or with status {@code 500 (Internal Server Error)} if the discount couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/discounts")
    public ResponseEntity<Discount> updateDiscount(@RequestBody Discount discount) throws URISyntaxException {
        log.debug("REST request to update Discount : {}", discount);
        if (discount.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Discount result = discountRepository.save(discount);
        discountSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, discount.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /discounts} : get all the discounts.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of discounts in body.
     */
    @GetMapping("/discounts")
    public List<Discount> getAllDiscounts() {
        log.debug("REST request to get all Discounts");
        return discountRepository.findAll();
    }

    /**
     * {@code GET  /discounts/:id} : get the "id" discount.
     *
     * @param id the id of the discount to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the discount, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/discounts/{id}")
    public ResponseEntity<Discount> getDiscount(@PathVariable Long id) {
        log.debug("REST request to get Discount : {}", id);
        Optional<Discount> discount = discountRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(discount);
    }

    /**
     * {@code DELETE  /discounts/:id} : delete the "id" discount.
     *
     * @param id the id of the discount to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/discounts/{id}")
    public ResponseEntity<Void> deleteDiscount(@PathVariable Long id) {
        log.debug("REST request to delete Discount : {}", id);
        discountRepository.deleteById(id);
        discountSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/discounts?query=:query} : search for the discount corresponding
     * to the query.
     *
     * @param query the query of the discount search.
     * @return the result of the search.
     */
    @GetMapping("/_search/discounts")
    public List<Discount> searchDiscounts(@RequestParam String query) {
        log.debug("REST request to search Discounts for query {}", query);
        return StreamSupport
            .stream(discountSearchRepository.search(queryStringQuery(query)).spliterator(), false)
        .collect(Collectors.toList());
    }
}
