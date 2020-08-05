package com.net.store.web.rest;

import com.net.store.domain.PointOfSale;
import com.net.store.repository.PointOfSaleRepository;
import com.net.store.repository.search.PointOfSaleSearchRepository;
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
 * REST controller for managing {@link com.net.store.domain.PointOfSale}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PointOfSaleResource {

    private final Logger log = LoggerFactory.getLogger(PointOfSaleResource.class);

    private static final String ENTITY_NAME = "pointOfSale";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PointOfSaleRepository pointOfSaleRepository;

    private final PointOfSaleSearchRepository pointOfSaleSearchRepository;

    public PointOfSaleResource(PointOfSaleRepository pointOfSaleRepository, PointOfSaleSearchRepository pointOfSaleSearchRepository) {
        this.pointOfSaleRepository = pointOfSaleRepository;
        this.pointOfSaleSearchRepository = pointOfSaleSearchRepository;
    }

    /**
     * {@code POST  /point-of-sales} : Create a new pointOfSale.
     *
     * @param pointOfSale the pointOfSale to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new pointOfSale, or with status {@code 400 (Bad Request)} if the pointOfSale has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/point-of-sales")
    public ResponseEntity<PointOfSale> createPointOfSale(@RequestBody PointOfSale pointOfSale) throws URISyntaxException {
        log.debug("REST request to save PointOfSale : {}", pointOfSale);
        if (pointOfSale.getId() != null) {
            throw new BadRequestAlertException("A new pointOfSale cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PointOfSale result = pointOfSaleRepository.save(pointOfSale);
        pointOfSaleSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/point-of-sales/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /point-of-sales} : Updates an existing pointOfSale.
     *
     * @param pointOfSale the pointOfSale to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pointOfSale,
     * or with status {@code 400 (Bad Request)} if the pointOfSale is not valid,
     * or with status {@code 500 (Internal Server Error)} if the pointOfSale couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/point-of-sales")
    public ResponseEntity<PointOfSale> updatePointOfSale(@RequestBody PointOfSale pointOfSale) throws URISyntaxException {
        log.debug("REST request to update PointOfSale : {}", pointOfSale);
        if (pointOfSale.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PointOfSale result = pointOfSaleRepository.save(pointOfSale);
        pointOfSaleSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, pointOfSale.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /point-of-sales} : get all the pointOfSales.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pointOfSales in body.
     */
    @GetMapping("/point-of-sales")
    public List<PointOfSale> getAllPointOfSales() {
        log.debug("REST request to get all PointOfSales");
        return pointOfSaleRepository.findAll();
    }

    /**
     * {@code GET  /point-of-sales/:id} : get the "id" pointOfSale.
     *
     * @param id the id of the pointOfSale to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the pointOfSale, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/point-of-sales/{id}")
    public ResponseEntity<PointOfSale> getPointOfSale(@PathVariable Long id) {
        log.debug("REST request to get PointOfSale : {}", id);
        Optional<PointOfSale> pointOfSale = pointOfSaleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(pointOfSale);
    }

    /**
     * {@code DELETE  /point-of-sales/:id} : delete the "id" pointOfSale.
     *
     * @param id the id of the pointOfSale to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/point-of-sales/{id}")
    public ResponseEntity<Void> deletePointOfSale(@PathVariable Long id) {
        log.debug("REST request to delete PointOfSale : {}", id);
        pointOfSaleRepository.deleteById(id);
        pointOfSaleSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/point-of-sales?query=:query} : search for the pointOfSale corresponding
     * to the query.
     *
     * @param query the query of the pointOfSale search.
     * @return the result of the search.
     */
    @GetMapping("/_search/point-of-sales")
    public List<PointOfSale> searchPointOfSales(@RequestParam String query) {
        log.debug("REST request to search PointOfSales for query {}", query);
        return StreamSupport
            .stream(pointOfSaleSearchRepository.search(queryStringQuery(query)).spliterator(), false)
        .collect(Collectors.toList());
    }
}
