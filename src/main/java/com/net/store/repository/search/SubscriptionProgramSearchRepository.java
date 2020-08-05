package com.net.store.repository.search;

import com.net.store.domain.SubscriptionProgram;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link SubscriptionProgram} entity.
 */
public interface SubscriptionProgramSearchRepository extends ElasticsearchRepository<SubscriptionProgram, Long> {
}
