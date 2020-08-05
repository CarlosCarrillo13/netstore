package com.net.store.web.rest;

import com.net.store.domain.Tax;
import com.net.store.repository.TaxRepository;
import com.net.store.repository.search.TaxSearchRepository;
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
 * REST controller for managing {@link com.net.store.domain.Tax}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TaxResource {

    private final Logger log = LoggerFactory.getLogger(TaxResource.class);

    private static final String ENTITY_NAME = "tax";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TaxRepository taxRepository;

    private final TaxSearchRepository taxSearchRepository;

    public TaxResource(TaxRepository taxRepository, TaxSearchRepository taxSearchRepository) {
        this.taxRepository = taxRepository;
        this.taxSearchRepository = taxSearchRepository;
    }

    /**
     * {@code POST  /taxes} : Create a new tax.
     *
     * @param tax the tax to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tax, or with status {@code 400 (Bad Request)} if the tax has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/taxes")
    public ResponseEntity<Tax> createTax(@RequestBody Tax tax) throws URISyntaxException {
        log.debug("REST request to save Tax : {}", tax);
        if (tax.getId() != null) {
            throw new BadRequestAlertException("A new tax cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Tax result = taxRepository.save(tax);
        taxSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/taxes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /taxes} : Updates an existing tax.
     *
     * @param tax the tax to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tax,
     * or with status {@code 400 (Bad Request)} if the tax is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tax couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/taxes")
    public ResponseEntity<Tax> updateTax(@RequestBody Tax tax) throws URISyntaxException {
        log.debug("REST request to update Tax : {}", tax);
        if (tax.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Tax result = taxRepository.save(tax);
        taxSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tax.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /taxes} : get all the taxes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of taxes in body.
     */
    @GetMapping("/taxes")
    public List<Tax> getAllTaxes() {
        log.debug("REST request to get all Taxes");
        return taxRepository.findAll();
    }

    /**
     * {@code GET  /taxes/:id} : get the "id" tax.
     *
     * @param id the id of the tax to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tax, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/taxes/{id}")
    public ResponseEntity<Tax> getTax(@PathVariable Long id) {
        log.debug("REST request to get Tax : {}", id);
        Optional<Tax> tax = taxRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tax);
    }

    /**
     * {@code DELETE  /taxes/:id} : delete the "id" tax.
     *
     * @param id the id of the tax to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/taxes/{id}")
    public ResponseEntity<Void> deleteTax(@PathVariable Long id) {
        log.debug("REST request to delete Tax : {}", id);
        taxRepository.deleteById(id);
        taxSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/taxes?query=:query} : search for the tax corresponding
     * to the query.
     *
     * @param query the query of the tax search.
     * @return the result of the search.
     */
    @GetMapping("/_search/taxes")
    public List<Tax> searchTaxes(@RequestParam String query) {
        log.debug("REST request to search Taxes for query {}", query);
        return StreamSupport
            .stream(taxSearchRepository.search(queryStringQuery(query)).spliterator(), false)
        .collect(Collectors.toList());
    }
}
