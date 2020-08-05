package com.net.store.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link SubscriptionProgramSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class SubscriptionProgramSearchRepositoryMockConfiguration {

    @MockBean
    private SubscriptionProgramSearchRepository mockSubscriptionProgramSearchRepository;

}