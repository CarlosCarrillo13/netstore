package com.net.store.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.net.store.web.rest.TestUtil;

public class SubscriptionProgramTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubscriptionProgram.class);
        SubscriptionProgram subscriptionProgram1 = new SubscriptionProgram();
        subscriptionProgram1.setId(1L);
        SubscriptionProgram subscriptionProgram2 = new SubscriptionProgram();
        subscriptionProgram2.setId(subscriptionProgram1.getId());
        assertThat(subscriptionProgram1).isEqualTo(subscriptionProgram2);
        subscriptionProgram2.setId(2L);
        assertThat(subscriptionProgram1).isNotEqualTo(subscriptionProgram2);
        subscriptionProgram1.setId(null);
        assertThat(subscriptionProgram1).isNotEqualTo(subscriptionProgram2);
    }
}
