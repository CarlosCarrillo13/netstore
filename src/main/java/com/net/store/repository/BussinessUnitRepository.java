package com.net.store.repository;

import com.net.store.domain.BussinessUnit;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the BussinessUnit entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BussinessUnitRepository extends JpaRepository<BussinessUnit, Long> {
}
