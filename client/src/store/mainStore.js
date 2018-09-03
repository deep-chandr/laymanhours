import {extendObservable} from 'mobx';
// import {List, Map, Set} from 'immutable';

class MainStore {
    constructor() {
        extendObservable(this, {
            posts: []
            // count: 1,
            // tableList: [],
            // collectionTableList: [],
            // recoveryTableList: [],
            // fieldInvestigationTableList: [],
            // changedRows: Set(),
            // pageCount: 0,
            // collectionPageCount:0,
            // recoveryPageCount:0,
            // fieldInvestigationPageCount:0,
            // currentWorkflowActionName: '',
            // actionFields: Map(),
            // optionsForCreatingWorkflow:[{
            //     text:'Select Workflow',
            //     value:''
            // }],
            // emis:[],
            // optionsForWorkflowNames: [],
            // optionsForActionNames: Map(),
            // optionsForCollectionActionNames: [{
            //     label: 'NEW_USER',
            //     value: 'NEW_USER'
            // }],
            // workflowtabAgentList: List(),
            // collectionAgentList: List(),
            // recoveryAgentList: List(),
            // fieldInvestigationAgentList: List(),
            // getLoanTypeOptions: List(),
            // modalContent:'',
            // callNetworkData:Map(),
            // callNetworkClickedIndex:'',
            // disposition_code_options: List(),
            
            // addNewGiftCardTableList: [],
            // giftCardModalContentStatus: []
        });
    }


}

export default new MainStore();