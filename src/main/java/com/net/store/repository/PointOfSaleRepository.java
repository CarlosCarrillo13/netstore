package com.net.store.repository;

import com.net.store.domain.PointOfSale;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the PointOfSale entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PointOfSaleRepository extends JpaRepository<PointOfSale, Long> {
}
