package com.Talentum.TalentumApplication.service;

import com.Talentum.TalentumApplication.model.Job;
import com.Talentum.TalentumApplication.repository.JobRepository;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class JobService {

    private final JobRepository jobRepository;

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    public Page<Job> getPaginatedJobs(Pageable pageable) {
        return jobRepository.findAll(pageable);
    }

    public static Specification<Job> getJobsByKeyword(String title,
                                                      String city,
                                                      List<String> types,
                                                      String experience,
                                                      List<Long> categoryIds) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (title != null) {
                Predicate titlePredicate = criteriaBuilder.or(
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), "%" + title.toLowerCase() + "%")
                );
                predicates.add(titlePredicate);
            }
            if (city != null) {
                Predicate cityPredicate = criteriaBuilder.or(
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("location")), "%" + city.toLowerCase() + "%")
                );
                predicates.add(cityPredicate);
            }

            if (types != null && !types.isEmpty()) {
                List<Predicate> typePredicates = new ArrayList<>();
                for (String type : types) {
                    Predicate typePredicate = criteriaBuilder.like(criteriaBuilder.lower(root.get("type")), "%" + type.toLowerCase() + "%");
                    typePredicates.add(typePredicate);
                }
                Predicate finalTypePredicates = criteriaBuilder.or(typePredicates.toArray(new Predicate[0]));
                predicates.add(finalTypePredicates);
            }

            if (experience != null) {
                Predicate experiencePredicate = criteriaBuilder.or(
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("experience")), "%" + experience.toLowerCase() + "%")
                );
                predicates.add(experiencePredicate);
            }
            if (categoryIds != null && !categoryIds.isEmpty()) {
                List<Predicate> categoryPredicates = new ArrayList<>();
                for (Long categoryId : categoryIds) {
                    Predicate categoryPredicate = criteriaBuilder.equal(root.get("category").get("id"), categoryId);
                    categoryPredicates.add(categoryPredicate);
                }
                Predicate finalCategoryPredicate = criteriaBuilder.or(categoryPredicates.toArray(new Predicate[0]));
                predicates.add(finalCategoryPredicate);
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
