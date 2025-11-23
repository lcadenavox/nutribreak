package com.nutribreak.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.nutribreak.model.BreakRecord;

public interface BreakRecordRepository extends JpaRepository<BreakRecord, Long> {
}
