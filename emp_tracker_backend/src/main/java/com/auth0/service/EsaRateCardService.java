package com.auth0.service;

import com.auth0.model.Employee;
import com.auth0.model.EsaRateCard;

import java.util.List;

public interface EsaRateCardService {

    String saveEsaRateCard(EsaRateCard esaRateCard);

    List<EsaRateCard> getEsaRateCards();

    EsaRateCard getEsaRateCardById(String esaAlphaValue);

    EsaRateCard updateEsaRateCard(EsaRateCard esaRateCard);

    String deleteEsaRateCard(String esaAlphaValue);

    List<Employee> getAllEmployeeByEsaRateCard(String esaAlphaValue);
}
