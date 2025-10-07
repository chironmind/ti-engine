use js_sys::Array;
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsValue;

// chart_trends has no single/bulk split; expose flat functions under a "chartTrends" JS namespace.

// peaks: Vec<(f64, usize)> -> Array<[value, index]>
#[wasm_bindgen(js_name = chart_trends_peaks)]
pub fn chart_trends_peaks(prices: Vec<f64>, period: usize, closest_neighbor: usize) -> Array {
    let pairs = rust_ti::chart_trends::peaks(&prices, period, closest_neighbor);
    let outer = Array::new();
    for (val, idx) in pairs {
        let inner = Array::new();
        inner.push(&JsValue::from_f64(val));
        inner.push(&JsValue::from_f64(idx as f64));
        outer.push(&inner);
    }
    outer
}

// valleys: Vec<(f64, usize)> -> Array<[value, index]>
#[wasm_bindgen(js_name = chart_trends_valleys)]
pub fn chart_trends_valleys(prices: Vec<f64>, period: usize, closest_neighbor: usize) -> Array {
    let pairs = rust_ti::chart_trends::valleys(&prices, period, closest_neighbor);
    let outer = Array::new();
    for (val, idx) in pairs {
        let inner = Array::new();
        inner.push(&JsValue::from_f64(val));
        inner.push(&JsValue::from_f64(idx as f64));
        outer.push(&inner);
    }
    outer
}

// peak_trend: (f64, f64) -> [slope, intercept]
#[wasm_bindgen(js_name = chart_trends_peakTrend)]
pub fn chart_trends_peak_trend(prices: Vec<f64>, period: usize) -> Array {
    let (slope, intercept) = rust_ti::chart_trends::peak_trend(&prices, period);
    let arr = Array::new();
    arr.push(&JsValue::from_f64(slope));
    arr.push(&JsValue::from_f64(intercept));
    arr
}

// valley_trend: (f64, f64) -> [slope, intercept]
#[wasm_bindgen(js_name = chart_trends_valleyTrend)]
pub fn chart_trends_valley_trend(prices: Vec<f64>, period: usize) -> Array {
    let (slope, intercept) = rust_ti::chart_trends::valley_trend(&prices, period);
    let arr = Array::new();
    arr.push(&JsValue::from_f64(slope));
    arr.push(&JsValue::from_f64(intercept));
    arr
}

// overall_trend: (f64, f64) -> [slope, intercept]
#[wasm_bindgen(js_name = chart_trends_overallTrend)]
pub fn chart_trends_overall_trend(prices: Vec<f64>) -> Array {
    let (slope, intercept) = rust_ti::chart_trends::overall_trend(&prices);
    let arr = Array::new();
    arr.push(&JsValue::from_f64(slope));
    arr.push(&JsValue::from_f64(intercept));
    arr
}

// break_down_trends: Vec<(usize, usize, f64, f64)> -> Array<[start, end, slope, intercept]>
// Updated to use TrendBreakConfig in rust_ti 2.1.5
// Maps old parameter names to new config structure
#[allow(clippy::too_many_arguments)]
#[wasm_bindgen(js_name = chart_trends_breakDownTrends)]
pub fn chart_trends_break_down_trends(
    prices: Vec<f64>,
    max_outliers: usize,
    soft_r_squared_minimum: f64,
    _soft_r_squared_maximum: f64,
    hard_r_squared_minimum: f64,
    _hard_r_squared_maximum: f64,
    soft_standard_error_multiplier: f64,
    hard_standard_error_multiplier: f64,
    soft_reduced_chi_squared_multiplier: f64,
    hard_reduced_chi_squared_multiplier: f64,
) -> Array {
    // Convert old parameters to new TrendBreakConfig
    // Note: rust_ti 2.1.5 changed from r-squared min/max to just minimums,
    // and from standard error/reduced chi-squared to RMSE and Durbin-Watson
    // We map the old soft/hard multipliers to the new RMSE multipliers
    // and use the old chi-squared parameters as Durbin-Watson bounds
    let config = rust_ti::chart_trends::TrendBreakConfig {
        max_outliers,
        soft_adj_r_squared_minimum: soft_r_squared_minimum,
        hard_adj_r_squared_minimum: hard_r_squared_minimum,
        soft_rmse_multiplier: soft_standard_error_multiplier,
        hard_rmse_multiplier: hard_standard_error_multiplier,
        soft_durbin_watson_min: soft_reduced_chi_squared_multiplier.clamp(0.0, 2.0),
        soft_durbin_watson_max: hard_reduced_chi_squared_multiplier.clamp(2.0, 4.0),
        hard_durbin_watson_min: 0.7,
        hard_durbin_watson_max: 3.3,
    };

    let segments = rust_ti::chart_trends::break_down_trends(&prices, config);
    let outer = Array::new();
    for (start, end, slope, intercept) in segments {
        let inner = Array::new();
        inner.push(&JsValue::from_f64(start as f64));
        inner.push(&JsValue::from_f64(end as f64));
        inner.push(&JsValue::from_f64(slope));
        inner.push(&JsValue::from_f64(intercept));
        outer.push(&inner);
    }
    outer
}
