package com.net.store.repository.search;

import com.net.store.domain.PointOfSale;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link PointOfSale} entity.
 */
public interface PointOfSaleSearchRepository extends ElasticsearchRepository<PointOfSale, Long> {
}
