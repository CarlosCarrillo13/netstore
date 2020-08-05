package com.net.store.web.rest;

import com.net.store.domain.SubscriptionProgram;
import com.net.store.repository.SubscriptionProgramRepository;
import com.net.store.repository.search.SubscriptionProgramSearchRepository;
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
 * REST controller for managing {@link com.net.store.domain.SubscriptionProgram}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SubscriptionProgramResource {

    private final Logger log = LoggerFactory.getLogger(SubscriptionProgramResource.class);

    private static final String ENTITY_NAME = "subscriptionProgram";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SubscriptionProgramRepository subscriptionProgramRepository;

    private final SubscriptionProgramSearchRepository subscriptionProgramSearchRepository;

    public SubscriptionProgramResource(SubscriptionProgramRepository subscriptionProgramRepository, SubscriptionProgramSearchRepository subscriptionProgramSearchRepository) {
        this.subscriptionProgramRepository = subscriptionProgramRepository;
        this.subscriptionProgramSearchRepository = subscriptionProgramSearchRepository;
    }

    /**
     * {@code POST  /subscription-programs} : Create a new subscriptionProgram.
     *
     * @param subscriptionProgram the subscriptionProgram to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new subscriptionProgram, or with status {@code 400 (Bad Request)} if the subscriptionProgram has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/subscription-programs")
    public ResponseEntity<SubscriptionProgram> createSubscriptionProgram(@RequestBody SubscriptionProgram subscriptionProgram) throws URISyntaxException {
        log.debug("REST request to save SubscriptionProgram : {}", subscriptionProgram);
        if (subscriptionProgram.getId() != null) {
            throw new BadRequestAlertException("A new subscriptionProgram cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SubscriptionProgram result = subscriptionProgramRepository.save(subscriptionProgram);
        subscriptionProgramSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/subscription-programs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /subscription-programs} : Updates an existing subscriptionProgram.
     *
     * @param subscriptionProgram the subscriptionProgram to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated subscriptionProgram,
     * or with status {@code 400 (Bad Request)} if the subscriptionProgram is not valid,
     * or with status {@code 500 (Internal Server Error)} if the subscriptionProgram couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/subscription-programs")
    public ResponseEntity<SubscriptionProgram> updateSubscriptionProgram(@RequestBody SubscriptionProgram subscriptionProgram) throws URISyntaxException {
        log.debug("REST request to update SubscriptionProgram : {}", subscriptionProgram);
        if (subscriptionProgram.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SubscriptionProgram result = subscriptionProgramRepository.save(subscriptionProgram);
        subscriptionProgramSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, subscriptionProgram.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /subscription-programs} : get all the subscriptionPrograms.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of subscriptionPrograms in body.
     */
    @GetMapping("/subscription-programs")
    public List<SubscriptionProgram> getAllSubscriptionPrograms(@RequestParam(required = false) String filter) {
        if ("subscriptionprogram-is-null".equals(filter)) {
            log.debug("REST request to get all SubscriptionPrograms where subscriptionProgram is null");
            return StreamSupport
                .stream(subscriptionProgramRepository.findAll().spliterator(), false)
                .filter(subscriptionProgram -> subscriptionProgram.getSubscriptionProgram() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all SubscriptionPrograms");
        return subscriptionProgramRepository.findAll();
    }

    /**
     * {@code GET  /subscription-programs/:id} : get the "id" subscriptionProgram.
     *
     * @param id the id of the subscriptionProgram to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the subscriptionProgram, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/subscription-programs/{id}")
    public ResponseEntity<SubscriptionProgram> getSubscriptionProgram(@PathVariable Long id) {
        log.debug("REST request to get SubscriptionProgram : {}", id);
        Optional<SubscriptionProgram> subscriptionProgram = subscriptionProgramRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(subscriptionProgram);
    }

    /**
     * {@code DELETE  /subscription-programs/:id} : delete the "id" subscriptionProgram.
     *
     * @param id the id of the subscriptionProgram to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/subscription-programs/{id}")
    public ResponseEntity<Void> deleteSubscriptionProgram(@PathVariable Long id) {
        log.debug("REST request to delete SubscriptionProgram : {}", id);
        subscriptionProgramRepository.deleteById(id);
        subscriptionProgramSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/subscription-programs?query=:query} : search for the subscriptionProgram corresponding
     * to the query.
     *
     * @param query the query of the subscriptionProgram search.
     * @return the result of the search.
     */
    @GetMapping("/_search/subscription-programs")
    public List<SubscriptionProgram> searchSubscriptionPrograms(@RequestParam String query) {
        log.debug("REST request to search SubscriptionPrograms for query {}", query);
        return StreamSupport
            .stream(subscriptionProgramSearchRepository.search(queryStringQuery(query)).spliterator(), false)
        .collect(Collectors.toList());
    }
}
