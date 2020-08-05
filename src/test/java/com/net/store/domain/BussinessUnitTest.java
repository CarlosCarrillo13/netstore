package com.net.store.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.net.store.web.rest.TestUtil;

public class BussinessUnitTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BussinessUnit.class);
        BussinessUnit bussinessUnit1 = new BussinessUnit();
        bussinessUnit1.setId(1L);
        BussinessUnit bussinessUnit2 = new BussinessUnit();
        bussinessUnit2.setId(bussinessUnit1.getId());
        assertThat(bussinessUnit1).isEqualTo(bussinessUnit2);
        bussinessUnit2.setId(2L);
        assertThat(bussinessUnit1).isNotEqualTo(bussinessUnit2);
        bussinessUnit1.setId(null);
        assertThat(bussinessUnit1).isNotEqualTo(bussinessUnit2);
    }
}
