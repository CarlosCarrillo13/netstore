package com.net.store.repository.search;

import com.net.store.domain.Prize;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link Prize} entity.
 */
public interface PrizeSearchRepository extends ElasticsearchRepository<Prize, Long> {
}
