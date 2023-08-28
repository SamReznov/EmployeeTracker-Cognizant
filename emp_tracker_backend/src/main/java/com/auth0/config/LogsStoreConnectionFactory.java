package com.auth0.config;

import java.sql.Connection;
import java.sql.SQLException;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
@Component
public class LogsStoreConnectionFactory
{


    @Value("${spring.datasource.url}")
    public  String url ;

    private static  String static_url;
    @Value("${spring.datasource.url}")
    private  void setUrlStatic(String url){
        LogsStoreConnectionFactory.static_url = url;
    }                                                          //These Three Lines are created to add value inside a static Variable @value annotation
                                                               //doesnt work with static variable,these three(two variable and one function) is created to bypass the problem


    @Value("${spring.datasource.username}")
    public  String userName ;

    private static  String static_userName;
    @Value("${spring.datasource.username}")
    private  void setUserNameStatic(String userName){
        LogsStoreConnectionFactory.static_userName = userName;
    }





    @Value("${spring.datasource.password}")
    public  String password ;

    private static  String static_password;
    @Value("${spring.datasource.password}")
    private  void setPasswordStatic(String password){
        LogsStoreConnectionFactory.static_password = password;
    }





    @Value("${spring.datasource.driver-class-name}")
    public  String driverName ;

    private static  String static_driverName;
    @Value("${spring.datasource.driver-class-name}")
    private  void setDriverNameStatic(String driverName){
        LogsStoreConnectionFactory.static_driverName = driverName;
    }



    private static BasicDataSource dataSource;



    private LogsStoreConnectionFactory() {
    }

    public static Connection getConnection() throws SQLException {

        if (dataSource == null) {
            dataSource = new BasicDataSource();
            dataSource.setUrl(static_url);
            dataSource.setDriverClassName(static_driverName);
            dataSource.setUsername(static_userName);
            dataSource.setPassword(static_password);
        }
        return dataSource.getConnection();
    }
}