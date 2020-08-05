package com.net.store.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link TaxSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class TaxSearchRepositoryMockConfiguration {

    @MockBean
    private TaxSearchRepository mockTaxSearchRepository;

}
