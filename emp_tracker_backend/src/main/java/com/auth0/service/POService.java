package com.auth0.service;

import com.auth0.model.Employee;
import com.auth0.model.PO;
import org.springframework.data.domain.Page;

import java.util.List;

public interface POService {

    String savePO(PO po);

    List<PO> getPOs();

    PO getPOById(double poNumber);

    PO updatePO(PO po);

    String deletePO(double poNumber);

    List<Employee> getAllEmployeeByPONumber(double poNumber);

    Page<PO> findAllPoByPage(int pageNo);
}
