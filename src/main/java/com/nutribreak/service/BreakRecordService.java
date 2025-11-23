package com.nutribreak.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nutribreak.dto.BreakRecordDTO;
import com.nutribreak.mapper.BreakRecordMapper;
import com.nutribreak.exception.ResourceNotFoundException;
import com.nutribreak.model.BreakRecord;
import com.nutribreak.model.User;
import java.time.LocalDateTime;
import com.nutribreak.repository.BreakRecordRepository;
import com.nutribreak.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BreakRecordService {
    private final BreakRecordRepository breakRecordRepository;
    private final UserRepository userRepository;
    private final BreakRecordMapper breakRecordMapper;

    @Transactional(readOnly = true)
    public Page<BreakRecordDTO> list(Pageable pageable) {
        return breakRecordRepository.findAll(pageable).map(breakRecordMapper::toDto);
    }

    @Transactional
    public BreakRecordDTO createForUser(BreakRecordDTO dto, String email) {
        User u = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        BreakRecord record = breakRecordMapper.toEntity(dto);
        record.setUser(u);
        if (record.getStartTime() == null) record.setStartTime(LocalDateTime.now());
        return breakRecordMapper.toDto(breakRecordRepository.save(record));
    }

    @Transactional(readOnly = true)
    public BreakRecordDTO get(Long id) {
        BreakRecord b = breakRecordRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Break not found"));
        return breakRecordMapper.toDto(b);
    }

    @Transactional
    public BreakRecordDTO update(Long id, BreakRecordDTO updatedDto) {
        BreakRecord existing = breakRecordRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Break not found"));
        breakRecordMapper.updateEntity(updatedDto, existing);
        return breakRecordMapper.toDto(existing);
    }

    @Transactional
    public void delete(Long id) {
        if (!breakRecordRepository.existsById(id)) throw new ResourceNotFoundException("Break not found");
        breakRecordRepository.deleteById(id);
    }
}
