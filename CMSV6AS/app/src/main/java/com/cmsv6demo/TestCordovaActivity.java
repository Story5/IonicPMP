package com.cmsv6demo;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.support.v4.content.LocalBroadcastManager;
import android.util.Log;
import android.view.ViewGroup;
import android.widget.Toast;

import org.apache.cordova.CordovaActivity;
import org.apache.cordova.engine.SystemWebView;

public class TestCordovaActivity extends CordovaActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.init();
        // Load your application
        launchUrl = "file:///android_asset/www/index.html";
        loadUrl(launchUrl);

        final BroadcastReceiver receiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                String userdata = intent.getExtras().getString("item");
//                Toast.makeText(context,"跳转"+userdata,Toast.LENGTH_SHORT).show();
                Log.v("onReceive","我收到消息啦");
                Intent intent1 = new Intent();
                intent1.setClass(TestCordovaActivity.this,DeviceActivity.class);
                intent1.putExtra("device","10210");
                startActivity(intent1);
            }
        };
        LocalBroadcastManager.getInstance(this).registerReceiver(receiver,new IntentFilter("openDevice"));

        final BroadcastReceiver receiver2 = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                String userdata = intent.getExtras().getString("item");
//                Toast.makeText(context,"跳转"+userdata,Toast.LENGTH_SHORT).show();
                Log.v("onReceive","我收到消息啦");
                Intent intent1 = new Intent();
                intent1.setClass(TestCordovaActivity.this,DeviceActivity.class);
                intent1.putExtra("device","10275");
                startActivity(intent1);
            }
        };
        LocalBroadcastManager.getInstance(this).registerReceiver(receiver2,new IntentFilter("openDevice2"));
    }

    @Override
    public void onDestroy() {
        ViewGroup viewGroup = (ViewGroup) this.findViewById(android.R.id.content);
        SystemWebView webView = (SystemWebView) viewGroup.getChildAt(0);
        viewGroup.removeView(webView);
        webView.removeAllViews();
        super.onDestroy();
    }
}