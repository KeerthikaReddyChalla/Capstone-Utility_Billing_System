package com.chubb.report.repository;

import java.util.List;
import java.util.Map;

public interface ReportRepository {

    List<Map<String, Object>> monthlyRevenue();

    List<Map<String, Object>> outstandingDues();

    List<Map<String, Object>> consumptionByUtility();

    Map<String, Object> consumerSummary(String consumerId);
}
