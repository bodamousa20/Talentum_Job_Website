package com.Talentum.TalentumApplication.repository;

import com.Talentum.TalentumApplication.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category,Long> {
    boolean existsByName(String name);
}
