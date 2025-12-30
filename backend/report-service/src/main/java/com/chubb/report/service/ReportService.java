package com.chubb.report.service;

import java.util.List;

import org.bson.Document;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import com.chubb.report.exception.ReportNotFoundException;

@Service
public class ReportService {

    private final MongoTemplate mongoTemplate;

    public ReportService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public List<Document> getMonthlyRevenue() {
        return mongoTemplate.findAll(Document.class, "monthly_revenue_view");
    }

    public List<Document> getOutstandingDues() {
        return mongoTemplate.findAll(Document.class, "outstanding_dues_view");
    }

    public List<Document> getConsumptionByUtility() {
        return mongoTemplate.findAll(Document.class, "consumption_by_utility_view");
    }

    public Document getConsumerSummary(String consumerId) {
        Document result =
                mongoTemplate.findById(consumerId, Document.class, "consumer_summary_view");

        if (result == null) {
            throw new ReportNotFoundException("Consumer report not found");
        }
        return result;
    }
}
