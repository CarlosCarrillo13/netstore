package com.net.store.repository.search;

import com.net.store.domain.Discount;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link Discount} entity.
 */
public interface DiscountSearchRepository extends ElasticsearchRepository<Discount, Long> {
}
