import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';

let markers = [];
let init = false;
let singleMarker = {};

export default class SevenHundredBikeMap extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    
  }
  componentDidMount() {
    this.amap = new AMap.Map(this.autoMapDom.id, {
      resizeEnable: true,
      center: [114.010437, 22.619073],
      zoom: 11,
    });
    this.amap.plugin(['AMap.ToolBar'], (() => {
      this.amap.addControl(new AMap.ToolBar());
    }));
    this.geocoder = new AMap.Geocoder({
      radius: 1000,
      extensions: 'all',
    });
    this.icon = new AMap.Icon({
      size: new AMap.Size(32, 32),  //图标大小
      image: 'http://img.ofo.so/cms/3bb8efa51d4d5da9693f5525398a3ecf.jpg',
    });
    this.infoWindow = new AMap.InfoWindow({ autoMove:true, closeWhenClickMap: true, offset: new AMap.Pixel(0, -30) });
  }
  componentDidUpdate() {
    if(!init){
      init = true;
      this.showHotMap();
    }
    if(singleMarker !== this.props.singleMarker){
      singleMarker = this.props.singleMarker;
      this.showInfoWindow(singleMarker);
    } else {
      this.showHotMap();
    }
  }
  showInfoWindow = (markerPosition) => {
    if(!_.isEmpty(markerPosition)){
      const singleMarker = markers.filter((record)=>{
        const recordPosition = record.getPosition();
        return recordPosition.L === markerPosition.lat &&
          recordPosition.I === markerPosition.lng;
      })[0];
      singleMarker && singleMarker.emit && singleMarker.emit('click', {target: singleMarker});
    }
  }
  showHotMap = () => {
    const bikeListInfo = this.props.bikeListInfo || [];
    markers = [];
    for (let i = 0; i < bikeListInfo.length; i += 1) {
      const markerPosition = [bikeListInfo[i].lng, bikeListInfo[i].lat];
      const marker = new AMap.Marker({
        position: markerPosition,
        icon: this.icon,
      });
      marker.on('click', () => {
        this.geocoder.getAddress(markerPosition, (status, result) => {
          if (status === 'complete' && result.info === 'OK') {
            let content = `<div>车牌号：${bikeListInfo[i].carno}</div>`;
            content += `<div>电量剩余：${bikeListInfo[i].battery}%</div>`;
            content += `<div>闲置时间：${bikeListInfo[i].idled}h</div>`;
            content += `<div>地址：${result.regeocode.formattedAddress}</div>`;
            content += `<div style="display: none;">经纬度：${markerPosition}</div>`;
            this.infoWindow.setContent(content);
            this.infoWindow.open(this.amap, markerPosition);
          }
        });
      });
      markers.push(marker);
    }
    if (this.cluster) {
      this.cluster.setMap(null);
    }
    this.amap.clearMap();
    this.amap.plugin(['AMap.Ω'], (() => {
      this.cluster = new AMap.MarkerClusterer(this.amap, markers);
    }));
    this.amap.setZoom(11);
    this.amap.setFitView();
  }
  render() {
    return (
      <div id="autoMap" style={this.props.style} ref={(c) => { this.autoMapDom = c; }} />
    )
  }
}
