package com.cmsv6demo;

import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.support.v4.content.LocalBroadcastManager;
import android.util.Log;
import android.view.View;
import android.widget.Button;

public class MainActivity extends Activity {

    private Button button1;
    private Button button2;
    private Button button3;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        button1 = (Button) findViewById(R.id.start_button1);
        button1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent();
                intent.setClass(MainActivity.this,TestCordovaActivity.class);
                startActivity(intent);
            }
        });

        button2 = (Button) findViewById(R.id.start_button2);
        button2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent();
                intent.setClass(MainActivity.this,TestCordovaWithLayoutActivity.class);
                startActivity(intent);
            }
        });

        button3 = (Button) findViewById(R.id.start_button3);
        button3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent();
                intent.setClass(MainActivity.this,DeviceActivity.class);
                startActivity(intent);
            }
        });

        final BroadcastReceiver receiver = new BroadcastReceiver() {
            @Override
                public void onReceive(Context context, Intent intent) {
//                final JSONObject data = new JSONObject(intent.getBundleExtra("userData"));
                Log.v("onReceive","我收到消息啦");
                startActivity(new Intent(MainActivity.this,DeviceActivity.class));
            }
        };
        LocalBroadcastManager.getInstance(this).registerReceiver(receiver,new IntentFilter("openDevice"));
    }
}