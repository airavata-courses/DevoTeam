import mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';

class App extends React.Component {
        
    constructor(props) {
        super(props);
    }
    
    closeAll = () => {
        this.refs.run1.instance.hide();
        this.refs.run2.instance.hide();
        this.refs.run3.instance.hide();
    }
    
    toggleFirst = () => {
        this.refs.run1.instance.toggle();
    }
    
    render() {
        return (
            <div>
               
                <mobiscroll.Card collapsible
                    ref="run1"
                    theme="ios"
                >
                    <mobiscroll.CardHeader>
                        <div>
                            <mobiscroll.CardSubtitle className="mbsc-bold mbsc-txt-s">27/07/2018</mobiscroll.CardSubtitle>
                            <div className="mbsc-bold">FRIDAY AFTERNOON RUN</div>
                            <div className="mbsc-grid mbsc-margin mbsc-txt-muted mbsc-bold mbsc-txt-s">
                                <div className="mbsc-row mbsc-no-padding">
                                    <div className="mbsc-col">5.43km</div>
                                    <div className="mbsc-col">5'44"/km</div>
                                    <div className="mbsc-col">30:45</div>
                                </div>
                            </div>
                        </div>
                    </mobiscroll.CardHeader>
                    <mobiscroll.CardContent className="mbsc-no-padding">
                        <img src="https://img.mobiscroll.com/demos/run-1.png" />
                        <div className="mbsc-btn-group-block">
                            <button className="mbsc-btn-primary">View details</button>
                            <button className="mbsc-btn-secondary">Share your run</button>
                        </div>
                    </mobiscroll.CardContent>
                </mobiscroll.Card>
                
                <mobiscroll.Card collapsible open
                    ref="run2"
                    theme="ios"
                >
                    <mobiscroll.CardHeader>
                        <div>
                            <mobiscroll.CardSubtitle className="mbsc-bold mbsc-txt-s">30/07/2018</mobiscroll.CardSubtitle>
                            <div className="mbsc-bold">MONDAY AFTERNOON RUN</div>
                            <div className="mbsc-grid mbsc-margin mbsc-txt-muted mbsc-bold mbsc-txt-s">
                                <div className="mbsc-row mbsc-no-padding">
                                    <div className="mbsc-col">4.28km</div>
                                    <div className="mbsc-col">4'12"/km</div>
                                    <div className="mbsc-col">26:41</div>
                                </div>
                            </div>
                        </div>
                    </mobiscroll.CardHeader>
                    <mobiscroll.CardContent className="mbsc-no-padding">
                        <img src="https://img.mobiscroll.com/demos/run-2.png" />
                        <div className="mbsc-btn-group-block">
                            <button className="mbsc-btn-primary">View details</button>
                            <button className="mbsc-btn-secondary">Share your run</button>
                        </div>
                    </mobiscroll.CardContent>
                </mobiscroll.Card>
                
                <mobiscroll.Card collapsible
                    ref="run3"
                    theme="ios"
                >
                    <mobiscroll.CardHeader>
                        <div>
                            <mobiscroll.CardSubtitle className="mbsc-bold mbsc-txt-s">01/08/2018</mobiscroll.CardSubtitle>
                            <div className="mbsc-bold">WEDNESDAY AFTERNOON RUN</div>
                            <div className="mbsc-grid mbsc-margin mbsc-txt-muted mbsc-bold mbsc-txt-s">
                                <div className="mbsc-row mbsc-no-padding">
                                    <div className="mbsc-col">7.02km</div>
                                    <div className="mbsc-col">3'59"/km</div>
                                    <div className="mbsc-col">37:41</div>
                                </div>
                            </div>
                        </div>
                    </mobiscroll.CardHeader>
                    <mobiscroll.CardContent className="mbsc-no-padding">
                        <img src="https://img.mobiscroll.com/demos/run-3.png" />
                        <div className="mbsc-btn-group-block">
                            <button className="mbsc-btn-primary">View details</button>
                            <button className="mbsc-btn-secondary">Share your run</button>
                        </div>
                    </mobiscroll.CardContent>
                </mobiscroll.Card>
                
            </div>
        );
    }    
}

