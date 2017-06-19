package com.babelstar.gviewer;

/*
 * 进行网络接口
 */
public class NetClient {
	public static final int NET_SUCCESS = 0;
	public static final int NET_ERR_RUNNING	= 8;	//正在执行业务处理
	
	public static final int GPS_CTRL_TYPE_FLIP_NORMAL 	= 16;	//正转翻转
	public static final int GPS_CTRL_TYPE_FLIP_REVERSE 	= 17;	//发转翻转
	
	public static final int SEARCH_FINISHED = 99;
	public static final int SEARCH_FAILED = 100;
	public static final int SEARCH_DEFAULT_PORT = 6688;

	public static final int GPS_PTZ_MOVE_LEFT	= 0;
	public static final int GPS_PTZ_MOVE_RIGHT	= 1;
	public static final int GPS_PTZ_MOVE_TOP	= 2;
	public static final int GPS_PTZ_MOVE_BOTTOM	= 3;
	public static final int GPS_PTZ_MOVE_LEFT_TOP	= 4;
	public static final int GPS_PTZ_MOVE_RIGHT_TOP	= 5;
	public static final int GPS_PTZ_MOVE_LEFT_BOTTOM	= 6;
	public static final int GPS_PTZ_MOVE_RIGHT_BOTTOM	= 7;

	public static final int GPS_PTZ_FOCUS_DEL =	8;
	public static final int GPS_PTZ_FOCUS_ADD =	9;
	public static final int GPS_PTZ_LIGHT_DEL = 10;
	public static final int GPS_PTZ_LIGHT_ADD = 11;
	public static final int GPS_PTZ_ZOOM_DEL = 12;
	public static final int GPS_PTZ_ZOOM_ADD = 13;
	public static final int GPS_PTZ_LIGHT_OPEN	= 14;
	public static final int GPS_PTZ_LIGHT_CLOSE	= 15;
	public static final int GPS_PTZ_WIPER_OPEN	= 16;
	public static final int GPS_PTZ_WIPER_CLOSE	= 17;
	public static final int GPS_PTZ_CRUISE	= 18;
	public static final int GPS_PTZ_MOVE_STOP = 19;
	
	public static final int GPS_PTZ_SPEED_DEFAULT = 128;
	
	public static final int GPS_RGB_FORMAT_565 = 1;
	public static final int GPS_RGB_FORMAT_888 = 2;
	public static final int GPS_RGB_FORMAT_8888	= 3;
	
	//网络类型，0表示3G，1表示WIFI
	public static final int GPS_NET_TYPE_3G		= 0;
	public static final int GPS_NET_TYPE_WIFI	= 1;
	public static final int GPS_NET_TYPE_NET	= 2;

	public static final int GPS_FILE_LOCATION_DEVICE	= 1;		//设备
	public static final int GPS_FILE_LOCATION_STOSVR	= 2;		//存储服务器
	//public static final int GPS_FILE_LOCATION_LOCAL		= 3;		//客户端本地
	public static final int GPS_FILE_LOCATION_DOWNSVR	= 4;		//下载服务器

	public static final int GPS_FILE_ATTRIBUTE_JPEG		= 1;
	public static final int GPS_FILE_ATTRIBUTE_RECORD	= 2;
	///#define GPS_FILE_ATTRIBUTE_ALL				3		//搜索时使用表示搜索所有录像文件
	public static final int GPS_FILE_ATTRIBUTE_LOG		= 4;	
	
	public static final int GPS_CHANNEL_ALL				= 99;	//所有通道
	
	public static final int GPS_FILE_TYPE_NORMAL		= 0;
	public static final int GPS_FILE_TYPE_ALARM			= 1;
	public static final int GPS_FILE_TYPE_ALL			= -1;

    public native static void Initialize();
    public native static void UnInitialize();
    public native static long SetDirSvr(String svrIP, String strLanIP, int port, int lanFirst);
         
    public native static long OpenRealPlay(String devIdno, int nChn, int nMode, int nCntMode);
    public native static int SetAutoSelect(long lRealHandle, int autoSelect);
    public native static int SetRealSession(long lRealHandle, String session);
    public native static int StartRealPlay(long lRealHandle);
    public native static int GetRPlayStatus(long lRealHandle);
    //rgbLength表示rgb565的长度
    //size[0] = width
    //size[1] = height
    //当函数返回不为0，需要判断size[0]和size[1]是否为0，如果不为0，则可能是长度不够
    public native static int GetRPlayImage(long lRealHandle, int rgbLength, byte[] rgb565, int[] size, int nRgbFormat);
    //format 数组长度为3，分别表示nChannels, nSamplePerSec, nBitPerSample
    public native static int GetWavFormat(long lRealHandle, int[] format);
    public native static int GetWavData(long lRealHandle, byte[] pWavBuf, int nWavLen);
    //取得码率
    public native static int GetRPlayRate(long lRealHandle);
    public native static int CaptureBMP(long lRealHandle, String fileName);
    public native static int RPlayPtzCtrl(long lRealHandle, int nCommand, int nSpeed, int nParam);
    public native static int RPlayStartRecord(long lRealHandle, String recPath, String devName);
    public native static int RPlayStopRecord(long lRealHandle);
    public native static int RPlayPlaySound(long lRealHandle, int isPlay);
    public native static int StopRealPlay(long lRealHandle);
    public native static int CloseRealPlay(long lRealHandle);
    
	//双向对讲
    public native static long TBOpenTalkback(String devIdno, int nChn, int nCntMode); 
	public native static int TBSetRealServer(long lTalkbackHandle, String ip, int usPort, String szSession); 
	public native static int TBSetSession(long lTalkbackHandle, String session);
	public native static int TBStartTalkback(long lTalkbackHandle);
	public native static int TBStopTalkback(long lTalkbackHandle);
	public native static int TBGetStatus(long lTalkbackHandle);
	public native static int TBSendWavData(long lTalkbackHandle, byte[] pWavBuf, int nWavLen);
	public native static int TBGetWavFormat(long lTalkbackHandle, int[] format);
	public native static int TBGetWavData(long lTalkbackHandle, byte[] pWavBuf, int nWavLen);
	public native static int TBCloseTalkback(long lTalkbackHandle);

	//录像文件搜索
	//文件搜索（图片或者录像文件）
	public native static long SFOpenSrchFile(String devIdno, int nLocation, int nAttributenFile);
	public native static int SFSetRealServer(long lSearchHandle, String ip, int usPort, String szSession); 
	public native static int SFSetSession(long lSearchHandle, String session);
	//szFileInfo:	szFile[256]:nYear:nMonth:nDay:uiBegintime:uiEndtime:szDevIDNO:nChn:nFileLen:nFileType:nLocation:nSvrID
	public native static int SFGetSearchFile(long lSearchHandle, byte[] szFileInfo, int nLength);
	public native static int SFStartSearchFile(long lSearchHandle, int nYear, int nMonth, int nDay
																, int nRecType, int nChn, int nBegTime, int nEndTime);
	public native static int SFStopSearchFile(long lSearchHandle);
	public native static int SFCloseSearchFile(long lSearchHandle); 

	//远程回放接口 PB = PlayBack
	public native static int PBOpenPlayBack(String tmpPath);	
	public native static int PBSetRealServer(long lPlaybackHandle, String ip, int usPort, String szSession);	
	public native static int PBSetSession(long lSearchHandle, String session);
	public native static int PBStartPlayback(long lPlaybackHandle, String fileInfo, int nPlayChannel, int nBegMinSecond, int nEndMinSecond
														 , int bPlayOnlyIFrame);
	//NETMEDIA_API int	API_CALL	NETMEDIA_PBAdjustedWndRect(long lPlaybackHandle);
	public native static int PBStopPlayback(long lPlaybackHandle);
    public native static int PBGetRPlayStatus(long lRealHandle);
    //rgbLength表示rgb565的长度
    //size[0] = width
    //size[1] = height
    //当函数返回不为0，需要判断size[0]和size[1]是否为0，如果不为0，则可能是长度不够
    public native static int PBGetRPlayImage(long lRealHandle, int rgbLength, byte[] rgb565, int[] size, int nRgbFormat);
    public native static int PBGetWavData(long lRealHandle, byte[] pWavBuf, int nWavLen);
	//取文件下载数据，单位KByte
	public native static int PBGetFlowRate(long lPlaybackHandle);
	//暂停
	public native static int PBPause(long lPlaybackHandle, int bPause);
	//拖动
	public native static int PBSetPlayTime(long lPlaybackHandle, int nMinSecond);
	//设置只放I帧
	public native static int PBSetPlayIFrame(long lPlaybackHandle, int bIFrame);
	//取得播放的毫秒数
	public native static int PBGetPlayTime(long lPlaybackHandle);
	//取得下载毫秒数
	public native static int PBGetDownTime(long lPlaybackHandle);
	//抓拍图片
	public native static int PBCaptureBMP(long lPlaybackHandle, String bmpFile);
	//是否播放结束
	public native static int PBIsPlayFinished(long lPlaybackHandle);
	//是否下载结束
	public native static int PBIsDownFinished(long lPlaybackHandle);
	//关闭远程回放
	public native static int PBClosePlayback(long lPlaybackHandle);

	//设备搜索
	public native static long SDOpenSearch();
	//szDevInfo为DevIDNO:NetType(0=Wifi, 1=Net):IP:DevType:chn
	public native static int SDGetSearchResult(long lSearchHandle, byte[] szDevIdno, int nLength);
	public native static int SDStartSearch(long lSearchHandle, int usPort);
	public native static int SDStopSearch(long lSearchHandle);
	public native static int SDCloseSearch(long lSearchHandle);
	public native static int SDConfigWifi(int usPort, String user, String pwd, String devIdno, String wifiSsid, String wifiPwd);

	//向设备发送控制指令
	public native static long MCOpenControl(String session, int bAutoSelect, int uiTimeoutMinSecond);	
	//正转和反转接口
	public native static int MCSendCtrl(long lControl, String devIdno, int nCtrlType);
	public native static int MCGetResult(long lControl, byte[] result, int nLength);
	public native static int MCCloseControl(long lControl);
	
    static {
        System.loadLibrary("ttxclient");
    }
}
