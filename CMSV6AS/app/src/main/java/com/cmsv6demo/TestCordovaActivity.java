package com.cmsv6demo;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.support.v4.content.LocalBroadcastManager;
import android.util.Log;
import android.view.KeyEvent;
import android.view.ViewGroup;
import android.widget.Toast;

import org.apache.cordova.CordovaActivity;
import org.apache.cordova.engine.SystemWebView;

import cn.jpush.android.api.JPushInterface;

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
                String userdata = intent.getExtras().getString("userdata");
                String deviceId = userdata.split("\"")[3].split(("\""))[0];

//                Toast.makeText(context,"跳转"+deviceId,Toast.LENGTH_SHORT).show();
                Log.v("onReceive","我收到消息啦");
                Intent intent1 = new Intent();
                intent1.setClass(TestCordovaActivity.this,DeviceActivity.class);
                intent1.putExtra("device",deviceId);
                startActivity(intent1);
            }
        };
        LocalBroadcastManager.getInstance(this).registerReceiver(receiver,new IntentFilter("openDevice"));

        JPushInterface.setDebugMode(true);
        JPushInterface.init(this);

        Log.v("极光推送","极光推送");
    }

    @Override
    public void onDestroy() {
        ViewGroup viewGroup = (ViewGroup) this.findViewById(android.R.id.content);
        SystemWebView webView = (SystemWebView) viewGroup.getChildAt(0);
        viewGroup.removeView(webView);
        webView.removeAllViews();
        super.onDestroy();
    }


    @Override
    public void onBackPressed() {
        Toast.makeText(this,"返回键",Toast.LENGTH_SHORT).show();
//        super.onBackPressed();
    }
}