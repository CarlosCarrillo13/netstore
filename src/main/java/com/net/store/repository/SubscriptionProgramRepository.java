package com.net.store.repository;

import com.net.store.domain.SubscriptionProgram;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the SubscriptionProgram entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubscriptionProgramRepository extends JpaRepository<SubscriptionProgram, Long> {
}
