import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';

const AutoMap = AMap; // eslint-disable-line

export default class HotMap extends Component {
  static getColor(time) {
    let color = '';
    switch (time) {
      case '08-10':
        color = '#FF0000';
        break;
      case '10-12':
        color = '#1EFF00';
        break;
      case '12-14':
        color = '#FFAB00';
        break;
      case '14-18':
        color = '#00FFFF';
        break;
      case '18-20':
        color = '#FF00F7';
        break;
      case '20-08':
        color = '#0011FF';
        break;
      default:
        color = '#0011FF';
    }
    return color;
  }

  componentDidMount() {
    this.amap = new AutoMap.Map(this.autoMapDom.id, {
      resizeEnable: true,
      zoom: 12,
    },
    );
    this.moveToTarget();
  }
  componentDidUpdate() {
    this.moveToTarget();
  }

  moveToTarget() {
    if (!this.amap) return;
    const circles = this.props.circles || [];
    const polygons = this.props.polygons || [];

    this.amap.clearMap();

    const polymarkerCetners = [];
    const polymarkers = polygons.map((item, idx) => {
      const marker = new AutoMap.Polygon({
        map: this.amap,
        path: JSON.parse(item.path),
      });
      polymarkerCetners.push(new AutoMap.Marker({
        map: this.amap,
        position: marker.getBounds().getCenter(),
        offset: new AutoMap.Pixel(-50, 0),
        label: { content: 123456, offset: new AutoMap.Pixel(-10, -20) },
        title: `${item.name} : 123456`,
      }))
      return marker;
    });

    const markers = circles.map((item) => {
      const marker = new AutoMap.Marker({
        position: item.center,
        offset: new AutoMap.Pixel(-20, -20),
        content: `<div style="width:20px;height:20px; border-radius:10px; background-color:rgba(255,0,0,0.5);line-height:20px; vertical-align:center;text-align:center">${item.num}</div>`,
      });
      return marker;
    })
    if (markers.length > 0) {
      if (this.cluster) {
        this.cluster.setMap(null);
      }
      const that = this;
      this.amap.plugin(['AMap.MarkerClusterer'], (() => {
        that.cluster = new AutoMap.MarkerClusterer(that.amap, markers, { maxZoom: 16 });
      }));
    }
    this.amap.setFitView()
  }

  render() {
    return (
      <div id="autoMap" ref={(c) => { this.autoMapDom = c; }} style={this.props.style} />
    )
  }
}

HotMap.propTypes = {
};
