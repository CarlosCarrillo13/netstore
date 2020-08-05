package com.net.store.repository.search;

import com.net.store.domain.BussinessUnit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link BussinessUnit} entity.
 */
public interface BussinessUnitSearchRepository extends ElasticsearchRepository<BussinessUnit, Long> {

    Page<BussinessUnit> findByName(String name, Pageable pageable);
}
