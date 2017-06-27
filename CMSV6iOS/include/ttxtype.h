#ifndef _TTX_TYPE_H_
#define _TTX_TYPE_H_

#ifdef WIN32
#define I64 __int64	
#define U64 unsigned __int64 
#else
#define I64 long long
#define U64 unsigned long long
#endif

#define TTX_S_OK  0
#define TTX_S_FALSE  -1

#define TTX_MAX_PATH 	260

#define TTX_SAFE_DELETE_OBJECT(p) if ((p) != NULL) {delete (p); (p) = NULL;}
#define TTX_SAFE_DELETE_ARRAY(p) if ((p) != NULL) {delete [] (p); (p) = NULL;}

#define TTX_FRM_TYPE_VIDEO_I		0
#define TTX_FRM_TYPE_VIDEO_P		1
#define TTX_FRM_TYPE_AUDIO			2
#define TTX_FRM_TYPE_INFO			3
#define TTX_FRM_TYPE_HEAD			4

#define TTX_FRM_STAMP_LENGTH		8

#define TTX_RGB_FORMAT_565			1
#define TTX_RGB_FORMAT_888			2
#define TTX_RGB_FORMAT_8888			3


#pragma pack(4)

typedef struct tagTtxTime {  
	unsigned short wYear;  
	unsigned short wMonth;  
	unsigned short wDayOfWeek;  
	unsigned short wDay;	
	unsigned short wHour;  
	unsigned short wMinute;  
	unsigned short wSecond;  
	unsigned short wMilliseconds;  
} TtxTime_S, *LPTtxTime_S;  

typedef struct _tagTtxFileInfo
{
	TtxTime_S	tmBegin;
	long	nTotalMinSecond;
	int	nChannel;
	char	szIDNO[32];
	U64 u64BegPts;
}TtxFileInfo_S;

typedef struct _tagTtxFileFrame
{
    U64 u64Pts;        /*presentation time stamp in time_base units*/
    unsigned char	*pU8Data;      /*frame addr(or binary addr)*/
    unsigned int	u32DataSize;   /*Data length*/
    unsigned int	u32FrmSize;    /*frame length*/
    unsigned int	u32Type;       /*index video, audio or binary*/
} TtxFileFrame_S, *LPTtxFileFrame_S;

#pragma pack()

#endif
