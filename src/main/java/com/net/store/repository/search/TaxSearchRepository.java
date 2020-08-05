package com.net.store.repository.search;

import com.net.store.domain.Tax;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link Tax} entity.
 */
public interface TaxSearchRepository extends ElasticsearchRepository<Tax, Long> {
}
