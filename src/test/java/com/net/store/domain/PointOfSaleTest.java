package com.net.store.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.net.store.web.rest.TestUtil;

public class PointOfSaleTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PointOfSale.class);
        PointOfSale pointOfSale1 = new PointOfSale();
        pointOfSale1.setId(1L);
        PointOfSale pointOfSale2 = new PointOfSale();
        pointOfSale2.setId(pointOfSale1.getId());
        assertThat(pointOfSale1).isEqualTo(pointOfSale2);
        pointOfSale2.setId(2L);
        assertThat(pointOfSale1).isNotEqualTo(pointOfSale2);
        pointOfSale1.setId(null);
        assertThat(pointOfSale1).isNotEqualTo(pointOfSale2);
    }
}
