







    export interface projectInterface{
      projectId: number,
      projectName: string
    }
    export interface projectWithRoleListInterface{
      projectId: number,
      projectName: string
      roleList:roleInterface[]
    }
    export interface roleInterface{
      roleId: number,
      roleName:string
    }
    export interface serviceInterface{
      serviceId: number,
      serviceName: string
    }
    export interface accountInterface{
      accountId:number,
      accName: string
    }
    export interface esaRateCardInterface{
        esaAlphanumericValue: string,
       esaValue: number
    }
    export interface poInterface{
      poNumber: string,
      poManager: string,
      dateIssued:string,
      expiryDate: string,
      extension: string
      account:accountInterface|undefined
    }
    
    export interface employeeInterface {
    ctsEmpId: number,
    empFirstName: string,
    empLastName: string,
    empEmail: string,
    empPhone: number,
    empLocation: number,
    teamName: null,
    empStartDate: string,
    empEndDate: string,
    projectSiteLocation: string,
    project: projectInterface,
    services: serviceInterface,
    esaRateCard: esaRateCardInterface,
    role: roleInterface,
    po: poInterface
    }
  


    export interface employeePageInterface{
    
    content:employeeInterface[],
    pageable: {
    sort: {
        empty: boolean,
        sorted: boolean,
        unsorted: boolean
    },
    offset: number,
    pageSize: number,
    pageNumber: number,
    unpaged: boolean,
    paged: boolean
    },
    last: boolean,
    totalPages: number,
    totalElements: number,
    size: number,
    number: number,
    sort: {
    empty: boolean,
    sorted: boolean,
    unsorted: boolean
    },
    first: boolean,
    numberOfElements: number,
    empty: boolean
    
    }
    export interface poPageInterface{
      content:poInterface[],
    pageable: {
    sort: {
        empty: boolean,
        sorted: boolean,
        unsorted: boolean
    },
    offset: number,
    pageSize: number,
    pageNumber: number,
    unpaged: boolean,
    paged: boolean
    },
    last: boolean,
    totalPages: number,
    totalElements: number,
    size: number,
    number: number,
    sort: {
    empty: boolean,
    sorted: boolean,
    unsorted: boolean
    },
    first: boolean,
    numberOfElements: number,
    empty: boolean
    }

    export interface poBlobDataInterface{
      poNumber:string,
      revisionDate:string,
      revisionNumber:string,
      totalAmount:string,
      // file:FormData,
      lineItemDTOList:any
    }