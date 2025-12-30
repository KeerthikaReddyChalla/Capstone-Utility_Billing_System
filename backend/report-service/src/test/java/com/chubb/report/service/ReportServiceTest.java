package com.chubb.report.service;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import org.bson.Document;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.data.mongodb.core.MongoTemplate;

import com.chubb.report.exception.ReportNotFoundException;

class ReportServiceTest {

    private final MongoTemplate mongoTemplate = Mockito.mock(MongoTemplate.class);
    private final ReportService service = new ReportService(mongoTemplate);

    @Test
    void consumerSummary_found() {
        Document doc = new Document("consumerId", "1");

        when(mongoTemplate.findById("1", Document.class, "consumer_summary_view"))
                .thenReturn(doc);

        Document result = service.getConsumerSummary("1");
        assertNotNull(result);
        assertEquals("1", result.getString("consumerId"));
    }

    @Test
    void consumerSummary_notFound() {
        when(mongoTemplate.findById("1", Document.class, "consumer_summary_view"))
                .thenReturn(null);

        assertThrows(ReportNotFoundException.class,
                () -> service.getConsumerSummary("1"));
    }
}
