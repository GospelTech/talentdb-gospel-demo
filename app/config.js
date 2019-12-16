window.config =
  {
    hostname: 'https://APPNAME.YOURDOMAIN.COM',
    caLoginPath: "ca/login?client=GospelTest",
    apiVersion: 'api/v1.1/',
    recordDefinitions: {
      accessLogDefinition: 'aaa',
      accessRequestsDefinition: 'LGAccessRequests',
      candidatesDefinition: 'LGGetUser',
      piiDataDefinition: 'LGPIIData',
      talentsDataDefinition: 'LGtalent01',
      viewersDefinition: 'LGViewers',
    },
    viewDefinitions: {
      accessRequestsDefinition: 'LGAccessRequestsView2',
      candidatesDefinition: 'LGUserView',
      talentsDataDefinition: 'LGTalentView',
    },
  };
