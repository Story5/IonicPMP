package com.cmsv6demo;

import android.app.Activity;
import android.os.Bundle;
import android.view.Menu;
import android.view.View;
import android.widget.Button;

import com.babelstar.gviewer.NetClient;
import com.babelstar.gviewer.VideoView;
import com.cmsv6demo.R;

public class DeviceActivity extends Activity {
	private UpdateViewThread mUpdateViewThread = null;	//视频界面更新线程
	private VideoView mVideoImage;
	private Button button1;
	private Button button2;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_device);
		button1 = (Button) findViewById(R.id.button1);
		button1.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View view) {
				mVideoImage.setViewInfo("10210", "10210", 0, "CH1");
				mVideoImage.StartAV();
			}
		});

		button2 = (Button) findViewById(R.id.button2);
		button2.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View view) {
				mVideoImage.setViewInfo("10275", "10275", 0, "CH1");
				mVideoImage.StartAV();
			}
		});

		mVideoImage = (VideoView) findViewById(R.id.imageView1);
		
		NetClient.Initialize();
//		NetClient.SetDirSvr("121.197.0.50", "121.197.0.50", 6605, 0);
//		mVideoImage.setViewInfo("90730", "90730", 0, "CH1");
		NetClient.SetDirSvr("211.162.125.99", "211.162.125.99", 6605, 0);
		mVideoImage.setViewInfo("10210", "10210", 0, "CH1");
		mVideoImage.StartAV();
		mUpdateViewThread = new UpdateViewThread();
		mUpdateViewThread.start();
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}

	@Override
	protected void onDestroy() {
		// TODO Auto-generated method stub
		mUpdateViewThread.setExit(true);
		mUpdateViewThread = null;
		mVideoImage.StopAV();
		NetClient.UnInitialize();
		super.onDestroy();
	}
    
    /*
	 * 播放状态检测线程
	 */
	private class UpdateViewThread extends Thread{
		private boolean isExit = false;
		private boolean isPause = false;
		
		public void setExit(boolean isExit) {
			this.isExit = isExit;
		}
		
		public void setPause(boolean isPause) {
			this.isPause = isPause;
		}
		
		public void run()   {  
			while (!isExit) {
				try {
					if (!isPause) {
						mVideoImage.updateView();
						Thread.sleep(20);
					} else {
						Thread.sleep(100);
					}
				} catch (InterruptedException e) {
					e.printStackTrace();
				} 
			}
			this.isExit = true;
	    }
	}
}
