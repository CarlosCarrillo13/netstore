package com.net.store.web.rest;

import com.net.store.domain.BussinessUnit;
import com.net.store.repository.BussinessUnitRepository;
import com.net.store.repository.search.BussinessUnitSearchRepository;
import com.net.store.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
 * REST controller for managing {@link com.net.store.domain.BussinessUnit}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BussinessUnitResource {

    private final Logger log = LoggerFactory.getLogger(BussinessUnitResource.class);

    private static final String ENTITY_NAME = "bussinessUnit";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BussinessUnitRepository bussinessUnitRepository;

    private final BussinessUnitSearchRepository bussinessUnitSearchRepository;

    public BussinessUnitResource(BussinessUnitRepository bussinessUnitRepository, BussinessUnitSearchRepository bussinessUnitSearchRepository) {
        this.bussinessUnitRepository = bussinessUnitRepository;
        this.bussinessUnitSearchRepository = bussinessUnitSearchRepository;
    }

    /**
     * {@code POST  /bussiness-units} : Create a new bussinessUnit.
     *
     * @param bussinessUnit the bussinessUnit to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new bussinessUnit, or with status {@code 400 (Bad Request)} if the bussinessUnit has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/bussiness-units")
    public ResponseEntity<BussinessUnit> createBussinessUnit(@RequestBody BussinessUnit bussinessUnit) throws URISyntaxException {
        log.debug("REST request to save BussinessUnit : {}", bussinessUnit);
        if (bussinessUnit.getId() != null) {
            throw new BadRequestAlertException("A new bussinessUnit cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BussinessUnit result = bussinessUnitRepository.save(bussinessUnit);
        bussinessUnitSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/bussiness-units/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /bussiness-units} : Updates an existing bussinessUnit.
     *
     * @param bussinessUnit the bussinessUnit to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bussinessUnit,
     * or with status {@code 400 (Bad Request)} if the bussinessUnit is not valid,
     * or with status {@code 500 (Internal Server Error)} if the bussinessUnit couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/bussiness-units")
    public ResponseEntity<BussinessUnit> updateBussinessUnit(@RequestBody BussinessUnit bussinessUnit) throws URISyntaxException {
        log.debug("REST request to update BussinessUnit : {}", bussinessUnit);
        if (bussinessUnit.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BussinessUnit result = bussinessUnitRepository.save(bussinessUnit);
        bussinessUnitSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, bussinessUnit.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /bussiness-units} : get all the bussinessUnits.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of bussinessUnits in body.
     */
    @GetMapping("/bussiness-units")
    public List<BussinessUnit> getAllBussinessUnits() {
        log.debug("REST request to get all BussinessUnits");
        return bussinessUnitRepository.findAll();
    }

    /**
     * {@code GET  /bussiness-units/:id} : get the "id" bussinessUnit.
     *
     * @param id the id of the bussinessUnit to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bussinessUnit, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/bussiness-units/{id}")
    public ResponseEntity<BussinessUnit> getBussinessUnit(@PathVariable Long id) {
        log.debug("REST request to get BussinessUnit : {}", id);
        Optional<BussinessUnit> bussinessUnit = bussinessUnitRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(bussinessUnit);
    }

    /**
     * {@code DELETE  /bussiness-units/:id} : delete the "id" bussinessUnit.
     *
     * @param id the id of the bussinessUnit to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/bussiness-units/{id}")
    public ResponseEntity<Void> deleteBussinessUnit(@PathVariable Long id) {
        log.debug("REST request to delete BussinessUnit : {}", id);
        bussinessUnitRepository.deleteById(id);
        bussinessUnitSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/bussiness-units?query=:query} : search for the bussinessUnit corresponding
     * to the query.
     *
     * @param query the query of the bussinessUnit search.
     * @return the result of the search.
     */
    @GetMapping("/_search/bussiness-units")
    public List<BussinessUnit> searchBussinessUnits(@RequestParam String query) {
        log.debug("REST request to search BussinessUnits for query {}", query);
        Pageable pageable = PageRequest.of(0, 10);

        List<BussinessUnit> bussinessUnits = StreamSupport.stream(bussinessUnitSearchRepository.findByName(query, pageable).spliterator(), false).collect(Collectors.toList());
        return StreamSupport
            .stream(bussinessUnitSearchRepository.search(queryStringQuery(query)).spliterator(), false)
        .collect(Collectors.toList());
    }

}
